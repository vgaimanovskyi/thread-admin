import Vue from 'vue'
import Vuex from 'vuex'
import shared from "./shared"
import login from "./login"
import orders from "./orders"
import reviews from "./reviews"
import videos from "./videos"
import { db } from "../main";
import { fs } from "../main";


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    categories: [
      {
        id: "00",
        name: "все"
      },
      {
        id: "01",
        name: "абстрактные картины"
      },
      {
        id: "02",
        name: "интерьерные картины"
      },
      {
        id: "03",
        name: "столы"
      },
      {
        id: "04",
        name: "фоторамки"
      },
      /* {
        id: "05",
        name: "разное"
      }, */
      {
        id: "09",
        name: "видео"
      }
    ],
    products: [],
    product: {}
  },
  mutations: {
    SET_PRODUCTS(state, payload) {
      state.products = payload;
    },
    SET_PRODUCT_REMOVE(state, payload) {
      const index = state.products.findIndex(product => product.id === payload);
      state.products.splice(index, 1);
    },
    SET_PRODUCT_UPDATE(state, payload) {
      const index = state.products.findIndex(product => product.id === payload.id);
      state.products.splice(index, 1, payload);
    },
    SET_PRODUCT_BY_ID(state, payload) {
      state.product = state.products.find(product => product.id === payload);
    },
  },
  actions: {
    async fetchAllProducts({ commit }) {
      let result = [];
      commit("CLEAR_ERROR");
      commit("SET_LOADING", true);

      try {
        const fbVal = await db.ref("products").once("value");
        const products = fbVal.val();
        Object.keys(products).forEach(key => {
          const product = products[key];
          result.push({
            id: key,
            available: product.available,
            catId: product.catId,
            description: product.description,
            discount: product.discount,
            material: product.material,
            name: product.name,
            new: product.new,
            price: product.price,
            size: product.size,
            urlGallery: product.urlGallery,
            urlPoster: product.urlPoster,
            urlShop: product.urlShop,
          });
        });
        commit("SET_PRODUCTS", result);
        commit("SET_LOADING", false);
      } catch (error) {
        commit("SET_ERROR", error.message);
        commit("SET_LOADING", false);
        throw error;
      }
    },
    async addNewProduct({ commit }, payload) {
      commit("CLEAR_ERROR");
      commit("SET_LOADING", true);

      const posterFile = payload.poster;
      const galleryArr = payload.gallery;
      const shopArr = payload.shop;

      const newProduct = {
        name: payload.name,
        material: payload.material,
        catId: payload.catId,
        size: payload.size,
        price: payload.price,
        discount: payload.discount,
        new: payload.new,
        description: payload.description,
        available: payload.available,
        urlPoster: "",
        urlGallery: [],
        urlShop: [],
      }

      try {
        const product = await db.ref("products").push(newProduct);
        // poster
        const posterExt = posterFile.name.slice(posterFile.name.lastIndexOf("."));
        const posterRef = fs.ref(`products/${product.key}/poster/${'poster'}${posterExt}`);
        await posterRef.put(posterFile);
        const posterSrc = await posterRef.getDownloadURL();
        // gallery
        const updatedGallerySrc = [];
        for (const [index, galleryFile] of galleryArr.entries()) {
          const galleryExt = galleryFile.name.slice(galleryFile.name.lastIndexOf("."));
          const galleryRef = fs.ref(`products/${product.key}/gallery/${index}${galleryExt}`);
          await galleryRef.put(galleryFile);
          const gallerySrc = await galleryRef.getDownloadURL();
          updatedGallerySrc.push(gallerySrc);
        }
        // shop
        const updatedShopSrc = [];
        for (const [index, shopFile] of shopArr.entries()) {
          const shopExt = shopFile.name.slice(shopFile.name.lastIndexOf("."));
          const shopRef = fs.ref(`products/${product.key}/shop/${index}${shopExt}`);
          await shopRef.put(shopFile);
          const shopSrc = await shopRef.getDownloadURL();
          updatedShopSrc.push(shopSrc);
        }
        // update product in firebase
        await db.ref("products").child(product.key).update({
          urlPoster: posterSrc,
          urlGallery: updatedGallerySrc,
          urlShop: updatedShopSrc
        });
        console.log("new product pushed");
        commit("SET_LOADING", false);
      } catch (error) {
        commit("SET_ERROR", error.message);
        commit("SET_LOADING", false);
        throw error
      }
    },
    async productRemove({ commit }, payload) {
      commit("CLEAR_ERROR");
      commit("SET_LOADING", true);
      try {
        // poster
        const posterUrlVal = await db.ref(`products/${payload}`).child("urlPoster").once("value");
        const posterUrl = posterUrlVal.val();
        const poster = fs.refFromURL(posterUrl);
        await poster.delete();
        console.log("poster deleted from the storage");
        // gallery
        const galleryUrlVal = await db.ref(`products/${payload}`).child("urlGallery").once("value");
        const galleryUrl = galleryUrlVal.val();
        galleryUrl.forEach(photoUrl => {
          const photo = fs.refFromURL(photoUrl);
          photo.delete();
        })
        console.log("gallery images deleted from the storage");
        // shop
        const shopUrlVal = await db.ref(`products/${payload}`).child("urlShop").once("value");
        const shopUrl = shopUrlVal.val();
        shopUrl.forEach(photoUrl => {
          const photo = fs.refFromURL(photoUrl);
          photo.delete();
        })
        console.log("shop images deleted from the storage");
        // database
        await db.ref(`products/${payload}`).remove();
        console.log("product removed from db");
        commit("SET_PRODUCT_REMOVE", payload);
        commit("SET_LOADING", false);
      } catch (error) {
        commit("SET_ERROR", error.message);
        commit("SET_LOADING", false);
        throw error
      }
    },
    async updateProduct({ commit }, payload) {
      commit("CLEAR_ERROR");
      commit("SET_LOADING", true);

      const posterFile = payload.urlPoster;
      const galleryArr = payload.urlGallery;
      const shopArr = payload.urlShop;

      let product = {
        name: payload.name,
        catId: payload.catId,
        available: payload.available,
        material: payload.material,
        size: payload.size,
        price: payload.price,
        discount: payload.discount,
        new: payload.new,
        description: payload.description
      }
      try {
        await db.ref(`products/${payload.id}`).update(product);
        product["id"] = payload.id;
        // === poster === //
        if (typeof posterFile === "string") {
          await db.ref(`products/${payload.id}`).update({ urlPoster: posterFile })
          product["urlPoster"] = posterFile;
        } else {
          const posterUrlVal = await db.ref(`products/${payload.id}`).child("urlPoster").once("value");
          const posterUrl = posterUrlVal.val();
          const oldPoster = fs.refFromURL(posterUrl);
          await oldPoster.delete();
          console.log("old poster deleted from the storage");
          const posterExt = posterFile.name.slice(posterFile.name.lastIndexOf("."));
          const posterRef = fs.ref(`products/${payload.id}/poster/${'poster'}${posterExt}`);
          await posterRef.put(posterFile);
          const posterSrc = await posterRef.getDownloadURL();
          await db.ref(`products/${payload.id}`).update({ urlPoster: posterSrc });
          product["urlPoster"] = posterSrc;
        }
        console.log("poster updated");
        // === gallery === //
        const updatedGallerySrc = [];
        for (const [index, galleryFile] of galleryArr.entries()) {
          if (typeof galleryFile === "string") {
            updatedGallerySrc.push(galleryFile);
          } else {
            const galleryExt = galleryFile.name.slice(galleryFile.name.lastIndexOf("."));
            const galleryRef = fs.ref(`products/${payload.id}/gallery/${index}${galleryExt}`);
            await galleryRef.put(galleryFile);
            const gallerySrc = await galleryRef.getDownloadURL();
            updatedGallerySrc.push(gallerySrc);
          }
        }
        await db.ref(`products/${payload.id}`).update({ urlGallery: updatedGallerySrc });
        product["urlGallery"] = updatedGallerySrc;
        console.log("gallery updated");
        // fetch all photos from the gallery folder
        const allGalleryUrl = [];
        const galleryList = await fs.ref(`products/${payload.id}/gallery`).listAll();
        for (let item of galleryList.items) {
          const photoUrl = await item.getDownloadURL();
          allGalleryUrl.push(photoUrl);
        }
        // find and delete out of use photos in the gallery folder
        for (let url of allGalleryUrl) {
          if (!updatedGallerySrc.includes(url)) {
            const photo = fs.refFromURL(url);
            await photo.delete();
          }
        }
        console.log("old gallery photos deleted from the storage");
        // === shop === //
        const updatedShopSrc = [];
        for (const [index, shopFile] of shopArr.entries()) {
          if (typeof shopFile === "string") {
            updatedShopSrc.push(shopFile);
          } else {
            const shopExt = shopFile.name.slice(shopFile.name.lastIndexOf("."));
            const shopRef = fs.ref(`products/${payload.id}/shop/${index}${shopExt}`);
            await shopRef.put(shopFile);
            const shopSrc = await shopRef.getDownloadURL();
            updatedShopSrc.push(shopSrc);
          }
        }
        await db.ref(`products/${payload.id}`).update({ urlShop: updatedShopSrc });
        product["urlShop"] = updatedShopSrc;
        console.log("shop updated");
        // fetch all photos from the shop folder
        const allShopUrl = [];
        const shopList = await fs.ref(`products/${payload.id}/shop`).listAll();
        for (let item of shopList.items) {
          const photoUrl = await item.getDownloadURL();
          allShopUrl.push(photoUrl);
        }
        // find and delete out of use photos in the shop folder
        for (let url of allShopUrl) {
          if (!updatedShopSrc.includes(url)) {
            const photo = fs.refFromURL(url);
            await photo.delete();
          }
        }
        console.log("old shop photos deleted from the storage");
        commit("SET_PRODUCT_UPDATE", product)
        commit("SET_LOADING", false);
      } catch (error) {
        commit("SET_ERROR", error.message);
        commit("SET_LOADING", false);
        throw error
      }
    },
    productById({ commit }, payload) {
      commit("SET_PRODUCT_BY_ID", payload);
    },
  },
  getters: {
    getCategories(state) {
      return state.categories.filter(cat => cat.id !== "00" && cat.id !== "09");
    },
    getProducts(state) {
      return state.products;
    },
    getProductById(state) {
      return state.product
    }
  },
  modules: {
    shared, login, orders, reviews, videos
  }
})

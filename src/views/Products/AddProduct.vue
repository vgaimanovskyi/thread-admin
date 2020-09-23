<template>
  <v-container>
    <v-row :justify="'center'">
      <v-col class="col-12 col-sm-8">
        <h1 class="text--secondary mb-3">Добавить новый товар</h1>
        <v-form ref="form" v-model="valid" validation>
          <v-text-field
            label="Название товара"
            name="Название"
            type="text"
            v-model="name"
            required
            :rules="[v => !!v || 'Поле обязательное']"
            :disabled="loading"
          ></v-text-field>
          <v-text-field
            label="Материал"
            name="Материал"
            type="text"
            v-model="material"
            :rules="[v => !!v || 'Поле обязательное']"
            :disabled="loading"
          ></v-text-field>
          <v-select
            v-model="cat"
            :items="categories"
            :item-text="'name'"
            :item-value="'id'"
            :menu-props="{ maxHeight: '400' }"
            label="Категории"
            multiple
            :disabled="loading"
          ></v-select>
          <v-row>
            <v-col class="col-12 col-sm-6 col-md-3">
              <v-text-field
                label="Размер"
                name="Размер"
                type="text"
                v-model="size"
                :rules="[v => !!v || 'Поле обязательное']"
                :disabled="loading"
              ></v-text-field>
            </v-col>
            <v-col class="col-12 col-sm-6 col-md-3">
              <v-text-field
                label="Цена, грн."
                name="Цена"
                type="number"
                v-model.number="price"
                :rules="priceRules"
                :disabled="loading"
              ></v-text-field>
            </v-col>
            <v-col class="col-12 col-sm-6 col-md-3">
              <v-text-field
                label="Скидка, %"
                name="Скидка"
                type="number"
                v-model.number="discount"
                :rules="[(v) => v >= 0 || 'Скидка должна быть не меньше 0']"
                :disabled="novelty || loading"
              ></v-text-field>
            </v-col>
            <v-col class="col-12 col-sm-6 col-md-3">
              <v-switch
                v-model="novelty"
                class="ma-2"
                label="Новинка"
                :disabled="discount > 0 || loading"
              ></v-switch>
            </v-col>
          </v-row>
          <v-textarea
            name="input-7-1"
            label="Описание товара"
            v-model="description"
            :auto-grow="true"
            :counter="300"
            :rules="descriptionRules"
            :disabled="loading"
          ></v-textarea>
          <v-switch v-model="available" class="ma-2" label="В наличии" :disabled="loading"></v-switch>
        </v-form>
        <v-row>
          <v-col>
            <v-row :align="'center'">
              <v-col class="col-12 col-md-6">
                <v-btn
                  :disabled="loading"
                  class="warning mr-3"
                  @click="triggerUpload('posterInput')"
                >
                  Постер
                  <v-icon right dark>mdi-cloud-upload</v-icon>
                </v-btn>
                <input
                  ref="posterInput"
                  type="file"
                  style="display: none;"
                  accept="image/*"
                  @change="posterUpload"
                />
              </v-col>
              <v-col class="col-12 col-md-6 pt-0 pt-md-3">
                <span>До 500 КВ</span>
              </v-col>
            </v-row>
          </v-col>
          <v-col>
            <img :src="posterSrc" height="150" v-if="posterSrc" />
            <div v-else style="color: red;">{{posterError}}</div>
          </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row>
          <v-col class="col-12 col-sm-6">
            <v-row :class="{'border': gallerySrc.length > 0}" :align="'center'">
              <v-col class="col-12 col-md-6">
                <v-btn
                  :disabled="loading"
                  class="primary mr-3"
                  @click="triggerUpload('galleryInput')"
                >
                  Галерея
                  <v-icon right dark>mdi-cloud-upload</v-icon>
                </v-btn>
                <input
                  ref="galleryInput"
                  type="file"
                  style="display: none;"
                  accept="image/*"
                  multiple
                  @change="galleryUpload"
                />
              </v-col>
              <v-col class="col-12 col-md-6 pt-0 pt-md-3">
                <span>До 1 МВ</span>
              </v-col>
              <v-col
                class="col-12 col-md-6"
                v-for="(photoSrc, index) in gallerySrc"
                :key="index"
                style="text-align: center;"
              >
                <div v-if="photoSrc === 'Неправельный файл'" style="color: red;">{{photoSrc}}</div>
                <div v-else style="overflow-x: hidden;">
                  <img :src="photoSrc" height="150" />
                </div>
              </v-col>
            </v-row>
          </v-col>
          <v-col class="col-12 col-sm-6">
            <v-row :align="'center'">
              <v-col class="col-12 col-md-6">
                <v-btn :disabled="loading" class="primary mr-3" @click="triggerUpload('shopInput')">
                  Магазин
                  <v-icon right dark>mdi-cloud-upload</v-icon>
                </v-btn>
                <input
                  ref="shopInput"
                  type="file"
                  style="display: none;"
                  accept="image/*"
                  multiple
                  @change="shopUpload"
                />
              </v-col>
              <v-col class="col-12 col-md-6 pt-0 pt-md-3">
                <span>До 500 КВ</span>
              </v-col>
            </v-row>
            <v-row>
              <v-col
                class="col-12 col-md-6"
                v-for="(photoSrc, index) in shopSrc"
                :key="index"
                style="text-align: center;"
              >
                <div v-if="photoSrc === 'Неправельный файл'" style="color: red;">{{photoSrc}}</div>
                <div v-else style="overflow-x: hidden;">
                  <img :src="photoSrc" height="150" />
                </div>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row>
          <v-col class="mt-3 mb-3">
            <v-btn
              class="success"
              :disabled="!valid || !poster || !photosValid || loading"
              :loading="loading"
              @click="createProduct"
            >Создать</v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// import { db } from "../../main";

export default {
  data() {
    return {
      valid: false,
      name: "",
      material: "",
      cat: [],
      size: "",
      price: null,
      discount: 0,
      novelty: false,
      description: "",
      available: false,
      poster: null,
      posterSrc: "",
      posterError: "",
      gallery: [],
      gallerySrc: [],
      galleryError: false,
      shop: [],
      shopSrc: [],
      shopError: false,
      priceRules: [
        (v) => !!v || "Поле обязательное",
        (v) => (v && v > 0) || "Цена должна быть больше 0",
      ],
      descriptionRules: [
        (v) => !!v || "Поле обязательное",
        (v) =>
          (v && v.length <= 300) ||
          "Описание должно быть не больше 300 символов",
      ],
    };
  },
  computed: {
    loading() {
      return this.$store.getters.getLoading;
    },
    categories() {
      return this.$store.getters.getCategories;
    },
    photosValid() {
      return (
        this.gallery.length === this.shop.length &&
        !this.shopError &&
        !this.galleryError
      );
    },
  },
  methods: {
    triggerUpload(ref) {
      this.$refs[ref].click();
    },
    posterUpload(event) {
      if (window.FileReader) {
        const file = event.target.files[0];
        this.poster = null;
        this.posterSrc = "";
        this.posterError = "";

        if (this.validFileType(file.type) && file.size <= 524288) {
          const reader = new FileReader();
          reader.onload = () => {
            this.posterSrc = reader.result;
          };
          reader.readAsDataURL(file);
          this.poster = file;
        } else {
          this.posterError = "Неправельный файл";
        }
      }
    },
    galleryUpload(event) {
      if (window.FileReader) {
        const galleryArr = event.target.files;
        this.gallery = [];
        this.gallerySrc = [];
        this.galleryError = false;

        galleryArr.forEach((photo) => {
          if (this.validFileType(photo.type) && photo.size <= 1048576) {
            const reader = new FileReader();
            reader.onload = () => {
              this.gallerySrc.push(reader.result);
            };
            reader.readAsDataURL(photo);
            this.gallery.push(photo);
          } else {
            this.gallerySrc.push("Неправельный файл");
            this.galleryError = true;
          }
        });
        this.gallery = this.gallery.sort((a, b) => a.name - b.name);
      }
    },
    shopUpload(event) {
      if (window.FileReader) {
        const shopArr = event.target.files;
        this.shop = [];
        this.shopSrc = [];
        this.shopError = false;

        shopArr.forEach((photo) => {
          if (this.validFileType(photo.type) && photo.size <= 524288) {
            const reader = new FileReader();
            reader.onload = () => {
              this.shopSrc.push(reader.result);
            };
            reader.readAsDataURL(photo);
            this.shop.push(photo);
          } else {
            this.shopSrc.push("Неправельный файл");
            this.shopError = true;
          }
        });
        this.shop = this.shop.sort((a, b) => a - b);
      }
    },
    validFileType(file) {
      return file.includes("image/");
    },
    createProduct() {
      this.cat.unshift("00");
      this.cat.sort((a, b) => a - b);
      if (this.$refs.form.validate() && this.poster && this.photosValid) {
        const product = {
          name: this.name,
          material: this.material,
          catId: this.cat,
          size: this.size,
          price: this.price,
          discount: this.discount,
          new: this.novelty,
          description: this.description,
          available: this.available,
          poster: this.poster,
          gallery: this.gallery,
          shop: this.shop,
        };
        this.$store
          .dispatch("addNewProduct", product)
          .then(() => {
            this.$refs.form.reset();
            this.discount = 0;
            this.novelty = false;
            this.available = false;
            this.poster = null;
            this.posterSrc = "";
            this.posterError = "";
            this.gallery = [];
            this.gallerySrc = [];
            this.galleryError = false;
            this.shop = [];
            this.shopSrc = [];
            this.shopError = false;
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            });
          })
          .catch((error) => console.log(error));
      }
    },
  },
};
</script>

<style lang="scss">
</style>
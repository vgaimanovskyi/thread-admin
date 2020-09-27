<template>
  <v-container>
    <v-row :justify="'center'">
      <v-col class="col-12 col-sm-8">
        <h1 class="text--secondary mb-3">Изменить товар</h1>
        <div class="text-center my-10" v-if="loading">
          <v-progress-circular
            :size="70"
            :width="7"
            color="purple"
            indeterminate
          ></v-progress-circular>
        </div>
        <div v-else>
          <v-form ref="form" v-model="valid" validation>
            <v-text-field
              label="Название товара"
              name="Название"
              type="text"
              v-model="product.name"
              required
              :rules="[(v) => !!v || 'Поле обязательное']"
            ></v-text-field>
            <v-text-field
              label="Материал"
              name="Материал"
              type="text"
              v-model="product.material"
              :rules="[(v) => !!v || 'Поле обязательное']"
            ></v-text-field>
            <v-select
              v-model="product.catId"
              :items="categories"
              :item-text="'name'"
              :item-value="'id'"
              :menu-props="{ maxHeight: '400' }"
              label="Категории"
              multiple
            ></v-select>
            <v-row>
              <v-col class="col-12 col-sm-6 col-md-3">
                <v-text-field
                  label="Размер"
                  name="Размер"
                  type="text"
                  v-model="product.size"
                  :rules="[(v) => !!v || 'Поле обязательное']"
                ></v-text-field>
              </v-col>
              <v-col class="col-12 col-sm-6 col-md-3">
                <v-text-field
                  label="Цена, грн."
                  name="Цена"
                  type="number"
                  v-model.number="product.price"
                  :rules="priceRules"
                ></v-text-field>
              </v-col>
              <v-col class="col-12 col-sm-6 col-md-3">
                <v-text-field
                  label="Скидка, %"
                  name="Скидка"
                  type="number"
                  v-model.number="product.discount"
                  :rules="[(v) => v >= 0 || 'Скидка должна быть не меньше 0']"
                  :disabled="product.new"
                ></v-text-field>
              </v-col>
              <v-col class="col-12 col-sm-6 col-md-3">
                <v-switch
                  v-model="product.new"
                  class="ma-2"
                  label="Новинка"
                  :disabled="product.discount > 0"
                ></v-switch>
              </v-col>
            </v-row>
            <v-textarea
              name="input-7-1"
              label="Описание товара"
              v-model="product.description"
              :auto-grow="true"
              :counter="300"
              :rules="descriptionRules"
            ></v-textarea>
            <v-switch
              v-model="product.available"
              class="ma-2"
              label="В наличии"
            ></v-switch>
          </v-form>
          <v-row>
            <v-col>
              <v-row :align="'center'">
                <v-col class="col-12 col-md-6">
                  <v-btn
                    class="warning mr-3"
                    @click="triggerUpload('posterInput')"
                  >
                    Постер
                    <v-icon right dark>mdi-cloud-upload</v-icon>
                  </v-btn>
                  <input
                    ref="posterInput"
                    type="file"
                    style="display: none"
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
              <div v-else style="color: red">{{ posterError }}</div>
            </v-col>
          </v-row>
          <v-divider></v-divider>
          <v-row>
            <v-col class="col-12 col-sm-6">
              <v-row
                :class="{ border: gallerySrc.length > 0 }"
                :align="'center'"
              >
                <v-col class="col-12 col-md-6">
                  <v-btn
                    class="primary mr-3"
                    @click="triggerUpload('galleryInput')"
                  >
                    Галерея
                    <v-icon right dark>mdi-cloud-upload</v-icon>
                  </v-btn>
                  <input
                    ref="galleryInput"
                    type="file"
                    style="display: none"
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
                  style="text-align: center"
                >
                  <div
                    v-if="photoSrc === 'Неправельный файл'"
                    style="color: red"
                  >
                    {{ photoSrc }}
                  </div>
                  <div v-else style="overflow-x: hidden">
                    <img :src="photoSrc" height="150" />
                  </div>
                </v-col>
              </v-row>
            </v-col>
            <v-col class="col-12 col-sm-6">
              <v-row :align="'center'">
                <v-col class="col-12 col-md-6">
                  <v-btn
                    class="primary mr-3"
                    @click="triggerUpload('shopInput')"
                  >
                    Магазин
                    <v-icon right dark>mdi-cloud-upload</v-icon>
                  </v-btn>
                  <input
                    ref="shopInput"
                    type="file"
                    style="display: none"
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
                  style="text-align: center"
                >
                  <div
                    v-if="photoSrc === 'Неправельный файл'"
                    style="color: red"
                  >
                    {{ photoSrc }}
                  </div>
                  <div v-else style="overflow-x: hidden">
                    <img :src="photoSrc" height="150" />
                  </div>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
          <v-divider></v-divider>
          <v-row>
            <v-col class="mt-3 mb-3 d-flex justify-center">
              <v-btn
                class="success"
                :disabled="!valid || !posterSrc || !photosValid || loading"
                :loading="loading"
                @click="updateProduct"
                >Обновить</v-btn
              >
            </v-col>
            <v-col class="mt-3 mb-3 d-flex justify-center">
              <v-btn
                class="warning"
                :disabled="loading"
                :loading="loading"
                @click="clearChanges"
                >Сбросить</v-btn
              >
            </v-col>
            <v-col class="mt-3 mb-3 d-flex justify-center">
              <v-btn
                class="error"
                :disabled="loading"
                :loading="loading"
                @click="productRemove(product.id)"
                >Удалить</v-btn
              >
            </v-col>
          </v-row>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  metaInfo: {
    title: "Product",
  },
  data() {
    return {
      id: this.$route.params["id"],
      valid: false,
      posterSrc: "",
      posterError: "",
      gallerySrc: [],
      galleryError: false,
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
    product() {
      return this.$store.getters.getProductById;
    },
    loading() {
      return this.$store.getters.getLoading;
    },
    categories() {
      return this.$store.getters.getCategories;
    },
    photosValid() {
      return (
        this.gallerySrc.length === this.shopSrc.length &&
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
        this.posterSrc = "";
        this.posterError = "";

        if (this.validFileType(file.type) && file.size <= 524288) {
          const reader = new FileReader();
          reader.onload = () => {
            this.posterSrc = reader.result;
          };
          reader.readAsDataURL(file);
          this.product.urlPoster = null;
          this.product.urlPoster = file;
        } else {
          this.posterError = "Неправельный файл";
        }
      }
    },
    galleryUpload(event) {
      if (window.FileReader) {
        const galleryArr = event.target.files;
        this.gallerySrc = [];
        this.galleryError = false;

        galleryArr.forEach((photo, index) => {
          if (this.validFileType(photo.type) && photo.size <= 1048576) {
            const reader = new FileReader();
            reader.onload = () => {
              this.gallerySrc.push(reader.result);
            };
            reader.readAsDataURL(photo);
            this.product.urlGallery.splice(index, 1, photo);
          } else {
            this.gallerySrc.push("Неправельный файл");
            this.galleryError = true;
          }
        });
      }
    },
    shopUpload(event) {
      if (window.FileReader) {
        const shopArr = event.target.files;
        this.shopSrc = [];
        this.shopError = false;

        shopArr.forEach((photo, index) => {
          if (this.validFileType(photo.type) && photo.size <= 524288) {
            const reader = new FileReader();
            reader.onload = () => {
              this.shopSrc.push(reader.result);
            };
            reader.readAsDataURL(photo);
            this.product.urlShop.splice(index, 1, photo);
          } else {
            this.shopSrc.push("Неправельный файл");
            this.shopError = true;
          }
        });
      }
    },
    validFileType(file) {
      return file.includes("image/");
    },
    async updateProduct() {
      this.product.catId.sort((a, b) => a - b);
      if (this.$refs.form.validate() && this.posterSrc && this.photosValid) {
        await this.$store
          .dispatch("updateProduct", this.product)
          .then(() => {
            this.$router.push("/products");
            this.scrollTop();
          })
          .catch((error) => console.log(error));
      }
    },
    clearChanges() {
      this.$store.dispatch("productById", this.id);
    },
    async productRemove(id) {
      await this.$store
        .dispatch("productRemove", id)
        .then(() => this.$router.push("/products"))
        .catch(() => {});
    },
    scrollTop() {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },
  },
  created() {
    this.$store.dispatch("productById", this.id);
    this.posterSrc = this.product.urlPoster;
    this.gallerySrc = this.product.urlGallery;
    this.shopSrc = this.product.urlShop;
    this.scrollTop();
  },
  watch: {
    $route(toR) {
      this.id = toR.params["id"];
    },
  },
};
</script>

<style lang="scss">
</style>
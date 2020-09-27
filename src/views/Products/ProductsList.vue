<template>
  <v-container>
    <v-row :justify="'center'">
      <v-col class="col-12 col-lg-11 col-xl-8">
        <v-row class="mb-3">
          <v-col class="col-12 col-md-5">
            <h1>Товар</h1>
          </v-col>
          <v-col class="col-12 col-sm-7 col-md-4">
            <v-autocomplete
              v-model="model"
              :items="products"
              :loading="loading"
              :search-input.sync="search"
              :filter="customFilter"
              clearable
              hide-details
              hide-selected
              item-text="name"
              item-value="name"
              label="Поиск..."
              solo
            ></v-autocomplete>
          </v-col>
          <v-col class="col-12 col-sm-5 col-md-3">
            <v-overflow-btn
              v-model="filterValue"
              @change="useFilter()"
              :items="filters"
              item-value="value"
              label="Фильтр"
              class="pa-0 ma-0"
              :disabled="!!model"
            ></v-overflow-btn>
          </v-col>
        </v-row>
        <div class="text-center my-10" v-if="loading">
          <v-progress-circular
            :size="70"
            :width="7"
            color="purple"
            indeterminate
          ></v-progress-circular>
        </div>
        <v-row class="mb-4" v-else>
          <v-col
            class="col-12 col-sm-6 col-md-4"
            v-for="product in sliceProducts()"
            :key="product.id"
          >
            <v-card class="mx-auto" width="330">
              <v-img :src="product.urlPoster" height="330px">
                <div class="tag tag--discount" v-if="product.discount">
                  -{{ product.discount }}%
                </div>
                <div class="tag tag--new" v-if="product.new">Новинка</div>
              </v-img>

              <v-card-title class="text-no-wrap">
                <span style="overflow-x: hidden" :title="product.name">{{
                  product.name
                }}</span>
              </v-card-title>

              <v-card-title class="pb-0 pt-0 amber--text">
                {{ product.price - (product.price * product.discount) / 100 }} $
                <s v-if="product.discount" class="grey--text text-body-1 ml-4"
                  >{{ product.price }} $</s
                >
              </v-card-title>

              <v-card-actions>
                <v-btn
                  color="primary"
                  text
                  :loading="loading"
                  :disabled="loading"
                  :to="'product/' + product.id"
                  >Изменить</v-btn
                >

                <v-btn
                  color="error"
                  text
                  :loading="loading"
                  :disabled="loading"
                  @click="productRemove(product.id)"
                  >Удалить</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
      <v-col class="col-12 col-lg-11 col-xl-8" :align="'center'" v-if="!model">
        <v-btn
          color="warning"
          :loading="loading"
          :disabled="loading || counter >= products.length"
          @click="moreProducts(9)"
          >Смотреть еще</v-btn
        >
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  metaInfo: {
    title: "Product list",
  },
  data() {
    return {
      counter: 0,
      model: null,
      search: "",
      filterValue: "",
      filters: [
        { text: "От дешевых к дорогим", value: "cheap" },
        { text: "От дорогих к дешевым", value: "expensive" },
        { text: "Новинки", value: "new" },
        { text: "Акционные", value: "promo" },
      ],
    };
  },
  computed: {
    loading() {
      return this.$store.getters.getLoading;
    },
    products() {
      return this.$store.getters.getProducts;
    },
  },
  methods: {
    async productRemove(id) {
      await this.$store.dispatch("productRemove", id);
    },
    moreProducts(n) {
      this.counter += n;
    },
    sliceProducts() {
      if (this.model) {
        return this.products.filter((product) => product.name == this.model);
      } else {
        return this.products.slice(0, this.counter);
      }
    },
    customFilter(item, queryText) {
      const textOne = item.name.toLowerCase();
      const textTwo = item.id.toLowerCase();
      const searchText = queryText.toLowerCase();

      return (
        textOne.indexOf(searchText) > -1 || textTwo.indexOf(searchText) > -1
      );
    },
    useFilter() {
      switch (this.filterValue) {
        case "cheap":
          this.products.sort(function (a, b) {
            const A = a.price - (a.price * a.discount) / 100;
            const B = b.price - (b.price * b.discount) / 100;
            return A - B;
          });
          break;
        case "expensive":
          this.products.sort(function (a, b) {
            const A = a.price - (a.price * a.discount) / 100;
            const B = b.price - (b.price * b.discount) / 100;
            return B - A;
          });
          break;
        case "new":
          this.products.sort((a, b) => b.new - a.new);
          break;
        case "promo":
          this.products.sort((a, b) => b.discount - a.discount);
          break;
        default:
          this.products.sort((a, b) => a.id - b.id);
      }
      this.sliceProducts();
    },
  },
  async created() {
    await this.$store.dispatch("fetchAllProducts");
    this.moreProducts(9);
  },
};
</script>

<style lang="scss">
.tag {
  position: absolute;
  top: 15px;
  left: 0;
  min-width: 68px;
  font-family: Montserrat, sans-serif;
  font-size: 11px;
  font-weight: 500;
  line-height: 23px;
  color: #fff;
  text-align: center;
  padding: 0 5px;
  box-sizing: border-box;

  &--discount {
    background-color: red;
  }
  &--new {
    background-color: #eb00ff;
  }
}
.active {
  transform: rotate(180deg);
  transition-duration: 0.3s;
}
.borders {
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
}
</style>
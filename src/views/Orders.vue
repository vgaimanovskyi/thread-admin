<template>
  <v-container>
    <v-row :justify="'center'">
      <v-col class="col-12 col-sm-8">
        <h1 class="mb-3">Заказы</h1>
        <div class="text-center my-10" v-if="loading">
          <v-progress-circular
            :size="70"
            :width="7"
            color="purple"
            indeterminate
          ></v-progress-circular>
        </div>
        <v-expansion-panels focusable v-else>
          <v-expansion-panel v-for="order in orders" :key="order.id">
            <v-expansion-panel-header disable-icon-rotate>
              {{ order.cartData.date | date("datetime") }}
              <template v-slot:actions>
                <v-icon color="teal" v-if="order.cartData.done"
                  >mdi-check</v-icon
                >
                <v-icon color="error" v-else>mdi-alert-circle</v-icon>
              </template>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <h3 class="mt-3">Оплата</h3>
              <v-row>
                <v-col class="col-12 col-xl-6">
                  <span class="grey--text">Общая стоимость:</span>
                  <b class="ml-3">{{ order.cartData.productsAmount }} $</b>
                </v-col>
                <v-col class="col-12 col-xl-6">
                  <span class="grey--text">Способ оплаты:</span>
                  <b class="ml-3">{{ order.deliveryData.pay }}</b>
                </v-col>
              </v-row>
              <hr />
              <h3 class="mt-3">Покупатель</h3>
              <v-row>
                <v-col class="col-12 col-md-6 col-xl-4">
                  <span class="grey--text">Имя:</span>
                  {{
                    order.customerData.name + " " + order.customerData.lastName
                  }}
                </v-col>
                <v-col class="col-12 col-md-6 col-xl-4">
                  <span class="grey--text">Телефон:</span>
                  {{ order.customerData.tel }}
                </v-col>
                <v-col class="col-12 col-xl-4">
                  <span class="grey--text">Email:</span>
                  {{ order.customerData.email }}
                </v-col>
              </v-row>
              <hr />
              <h3 class="mt-3">Доставка</h3>
              <v-row>
                <v-col class="col-12 col-xl-6">
                  <span class="grey--text">Город:</span>
                  {{ order.deliveryData.city }}
                </v-col>
                <v-col class="col-12 col-xl-6">
                  <span class="grey--text">Тип доставки:</span>
                  {{ order.deliveryData.deliveryName }}
                </v-col>
                <v-col
                  class="col-12"
                  v-if="
                    order.deliveryData.deliveryName ===
                    'Доставка в отделение (Новая Почта)'
                  "
                >
                  <span class="grey--text">Отделение:</span>
                  {{ order.deliveryData.warehouse }}
                </v-col>
                <v-col class="col-12" v-else>
                  <v-row>
                    <v-col class="col-12 col-md-auto">
                      <span class="grey--text">Улица:</span>
                      {{ order.deliveryData.street }}
                    </v-col>
                    <v-col class="col-12 col-md-auto">
                      <span class="grey--text">Дом:</span>
                      {{ order.deliveryData.house }}
                    </v-col>
                    <v-col class="col-12 col-md-auto">
                      <span class="grey--text">Квартира:</span>
                      {{ order.deliveryData.flat }}
                    </v-col>
                  </v-row>
                </v-col>
                <v-col class="col-12">
                  <span class="grey--text">Комментарий:</span>
                  <br />
                  {{ order.deliveryData.comment }}
                </v-col>
              </v-row>
              <hr />
              <h3 class="mt-3">Товар</h3>
              <v-row v-for="product in order.productsData" :key="product.id">
                <v-col class="col-12 col-md-6">
                  <v-row>
                    <v-col class="col-12">
                      <span class="grey--text">Имя:</span>
                      {{ product.name }}
                    </v-col>
                    <v-col class="col-12">
                      <span class="grey--text">Стоимость:</span>
                      {{ product.price * product.count }} $
                    </v-col>
                    <v-col class="col-12">
                      <span class="grey--text">Колличество:</span>
                      {{ product.count }} шт.
                    </v-col>
                  </v-row>
                </v-col>
                <v-col class="col-12 col-md-6">
                  <v-img
                    :src="product.urlPoster"
                    :alt="product.name"
                    max-height="144"
                    contain
                  ></v-img>
                </v-col>
              </v-row>
              <hr />
              <v-row>
                <v-col class="col-12 col-md-6 d-flex justify-center">
                  <v-btn
                    class="ma-2"
                    :loading="loading"
                    :disabled="order.cartData.done || loading"
                    color="success"
                    @click="orederDone(order.id)"
                    >Выполнено</v-btn
                  >
                </v-col>
                <v-col class="col-12 col-md-6 d-flex justify-center">
                  <v-btn
                    class="ma-2"
                    :loading="loading"
                    :disabled="loading"
                    color="error"
                    @click="orderRemove(order.id)"
                    >Удалить</v-btn
                  >
                </v-col>
              </v-row>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  metaInfo: {
    title: "Admin Orders",
  },
  computed: {
    orders() {
      return this.$store.getters.getOrders;
    },
    loading() {
      return this.$store.getters.getLoading;
    },
  },
  methods: {
    async orederDone(id) {
      await this.$store.dispatch("orderDone", id);
    },
    async orderRemove(id) {
      await this.$store.dispatch("orderRemove", id);
    },
  },
  async created() {
    await this.$store.dispatch("fetchOrders");
  },
};
</script>

<style>
</style>
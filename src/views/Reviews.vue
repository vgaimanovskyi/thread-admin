<template>
  <v-container>
    <v-row :justify="'center'">
      <v-col class="col-12 col-sm-8">
        <h1 class="mb-3">Отзывы</h1>
        <div class="text-center my-10" v-if="loading">
          <v-progress-circular :size="70" :width="7" color="purple" indeterminate></v-progress-circular>
        </div>
        <v-expansion-panels focusable v-else>
          <v-expansion-panel v-for="review in reviews" :key="review.id">
            <v-expansion-panel-header disable-icon-rotate>
              {{review.date | date("datetime")}}
              <template v-slot:actions>
                <v-icon color="teal" v-if="review.done">mdi-check</v-icon>
                <v-icon color="error" v-else>mdi-alert-circle</v-icon>
              </template>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-row>
                <v-col class="col-12">
                  <v-row>
                    <v-col class="col-12 col-md-6">
                      <span class="grey--text">Имя:</span>
                      {{review.yourname}}
                    </v-col>
                    <v-col class="col-12 col-md-6">
                      <span class="grey--text">Email:</span>
                      {{review.email}}
                    </v-col>
                    <v-col class="col-12 col-md-6">
                      <span class="grey--text">Тел:</span>
                      {{review.tel}}
                    </v-col>
                    <v-col class="col-12 col-md-6">
                      <v-btn
                        text
                        color="primary"
                        :href="review.fileUrl"
                        :target="'_blank'"
                        download
                      >Открыть файл</v-btn>
                    </v-col>
                    <v-col class="col-12">
                      <span class="grey--text">Комментарий:</span>
                      <br />
                      {{review.comment}}
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
              <hr />
              <v-row>
                <v-col class="col-12 col-sm-4 d-flex justify-center">
                  <v-btn
                    class="ma-2"
                    :loading="loading"
                    :disabled="loading"
                    color="primary"
                    @click="sendReviewAnswer(review.email)"
                  >Ответить</v-btn>
                </v-col>
                <v-col class="col-12 col-sm-4 d-flex justify-center">
                  <v-btn
                    class="ma-2"
                    :loading="loading"
                    :disabled="review.done || loading"
                    color="success"
                    @click="reviewDone(review.id)"
                  >Выполнено</v-btn>
                </v-col>
                <v-col class="col-12 col-sm-4 d-flex justify-center">
                  <v-btn
                    class="ma-2"
                    :loading="loading"
                    :disabled="loading"
                    color="error"
                    @click="reviewRemote(review.id)"
                  >Удалить</v-btn>
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
  data() {
    return {};
  },
  computed: {
    reviews() {
      return this.$store.getters.getReviews;
    },
    loading() {
      return this.$store.getters.getLoading;
    },
  },
  methods: {
    async reviewDone(id) {
      await this.$store.dispatch("reviewDone", id);
    },
    async reviewRemote(id) {
      await this.$store.dispatch("reviewRemote", id);
    },
    sendReviewAnswer(address) {
      location.href = `mailto:${address}`;
    },
  },
  async created() {
    await this.$store.dispatch("fetchReviews");
  },
};
</script>

<style>
</style>
<template>
  <v-container>
    <v-row :justify="'center'">
      <v-col class="col-12 col-sm-8">
        <h1 class="text--secondary mb-3">Добавить новое видео</h1>
        <v-form ref="form" v-model="valid" validation>
          <v-text-field
            label="Название видео"
            name="name"
            type="text"
            v-model="video.name"
            required
            :rules="[v => !!v || 'Поле обязательное']"
          ></v-text-field>
          <v-text-field
            label="ID видео"
            name="address"
            type="text"
            hint
            v-model.lazy="video.video"
            :rules="videoRules"
          ></v-text-field>
          <div class="font-weight-regular mb-3">
            Пример:
            <i>https://www.youtube.com/watch?v=</i>
            <b>pZvRgstCvEw</b>
          </div>
          <iframe
            style="display: block; margin: 0 auto;"
            v-if="video.video"
            width="560"
            height="315"
            :src="'https://www.youtube.com/embed/' + video.video"
            frameborder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </v-form>
        <v-row>
          <v-col class="mt-3 mb-3 d-flex justify-center">
            <v-btn
              class="success"
              :disabled="!valid || loading"
              :loading="loading"
              @click="updateVideo"
            >Обновить</v-btn>
          </v-col>
          <v-col class="mt-3 mb-3 d-flex justify-center">
            <v-btn
              class="warning"
              :disabled="loading"
              :loading="loading"
              @click="clearChanges"
            >Сбросить</v-btn>
          </v-col>
          <v-col class="mt-3 mb-3 d-flex justify-center">
            <v-btn
              class="error"
              :disabled="loading"
              :loading="loading"
              @click="videoRemove(video.id)"
            >Удалить</v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      id: this.$route.params["id"],
      valid: false,
      videoRules: [
        (v) => !!v || "Поле обязательное",
        (v) => (v && v.length === 11) || "ID видео содержит 11 символов",
      ],
    };
  },
  computed: {
    video() {
      return this.$store.getters.getVideoById;
    },
    loading() {
      return this.$store.getters.getLoading;
    },
  },
  methods: {
    async updateVideo() {
      if (this.$refs.form.validate()) {
        await this.$store
          .dispatch("updateVideo", this.video)
          .then(() => {
            this.$router.push("/videos");
            this.scrollTop();
          })
          .catch((error) => console.log(error));
      }
    },
    clearChanges() {
      this.$store.dispatch("videoById", this.id);
    },
    async videoRemove(id) {
      await this.$store
        .dispatch("videoRemove", id)
        .then(() => this.$router.push("/videos"))
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
    this.$store.dispatch("videoById", this.id);
    this.scrollTop();
  },
  watch: {
    $route(toR) {
      this.id = toR.params["id"];
    },
  },
};
</script>

<style>
</style>
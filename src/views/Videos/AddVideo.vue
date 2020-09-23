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
            v-model="name"
            required
            :rules="[v => !!v || 'Поле обязательное']"
          ></v-text-field>
          <v-text-field
            label="ID видео"
            name="address"
            type="text"
            hint
            v-model.lazy="videoID"
            :rules="videoRules"
          ></v-text-field>
          <div class="font-weight-regular mb-3">
            Пример:
            <i>https://www.youtube.com/watch?v=</i>
            <b>pZvRgstCvEw</b>
          </div>
          <iframe
            style="display: block; margin: 0 auto;"
            v-if="videoID"
            width="560"
            height="315"
            :src="'https://www.youtube.com/embed/' + videoID"
            frameborder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </v-form>
        <v-row>
          <v-col class="mt-3 mb-3">
            <v-btn
              class="success"
              :disabled="!valid || loading"
              :loading="loading"
              @click="createVideo"
            >Создать</v-btn>
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
      valid: false,
      name: "",
      videoID: "",
      videoRules: [
        (v) => !!v || "Поле обязательное",
        (v) => (v && v.length === 11) || "ID видео содержит 11 символов",
      ],
    };
  },
  computed: {
    loading() {
      return this.$store.getters.getLoading;
    },
  },
  methods: {
    createVideo() {
      if (this.$refs.form.validate()) {
        const video = {
          name: this.name,
          video: this.videoID,
          catId: ["00", "09"],
        };
        this.$store
          .dispatch("addNewVideo", video)
          .then(() => {
            this.$refs.form.reset();
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

<style>
</style>
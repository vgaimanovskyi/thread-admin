<template>
  <v-container>
    <v-row :justify="'center'">
      <v-col class="col-12 col-lg-11 col-xl-8">
        <v-row class="mb-3">
          <v-col class="col-12 col-sm-6">
            <h1>Видео</h1>
          </v-col>
          <v-col class="col-12 col-sm-6">
            <v-autocomplete
              v-model="model"
              :items="videos"
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
        </v-row>
        <div class="text-center my-10" v-if="loading">
          <v-progress-circular :size="70" :width="7" color="purple" indeterminate></v-progress-circular>
        </div>
        <v-row class="mb-4" v-else>
          <v-col class="col-12 col-sm-6 col-md-4" v-for="video in sliceVideos()" :key="video.id">
            <v-card class="mx-auto" max-width="330">
              <v-img :src="'https://img.youtube.com/vi/'+ video.video + '/mqdefault.jpg'"></v-img>

              <v-card-title
                style="min-height: 62px;"
                class="text-subtitle-2 align-start pb-1"
              >{{video.name}}</v-card-title>

              <v-card-actions>
                <v-btn
                  color="primary"
                  text
                  :loading="loading"
                  :disabled="loading"
                  :to="'video/' + video.id"
                >Изменить</v-btn>

                <v-btn
                  color="error"
                  text
                  :loading="loading"
                  :disabled="loading"
                  @click="videoRemove(video.id)"
                >Удалить</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
      <v-col class="col-12 col-lg-11 col-xl-8" :align="'center'" v-if="!model">
        <v-btn
          color="warning"
          :loading="loading"
          :disabled="loading || counter >= videos.length"
          @click="moreVideos(9)"
        >Смотреть еще</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      counter: 0,
      model: null,
      search: "",
    };
  },
  computed: {
    loading() {
      return this.$store.getters.getLoading;
    },
    videos() {
      return this.$store.getters.getVideos;
    },
  },
  methods: {
    async videoRemove(id) {
      await this.$store.dispatch("videoRemove", id);
    },
    moreVideos(n) {
      this.counter += n;
      this.sliceVideos();
    },
    sliceVideos() {
      if (this.model) {
        return this.videos.filter((video) => video.name == this.model);
      } else {
        return this.videos.slice(0, this.counter);
      }
    },
    customFilter(item, queryText) {
      const textOne = item.name.toLowerCase();
      const textTwo = item.video.toLowerCase();
      const searchText = queryText.toLowerCase();

      return (
        textOne.indexOf(searchText) > -1 || textTwo.indexOf(searchText) > -1
      );
    },
  },
  async created() {
    await this.$store.dispatch("fetchAllVideos");
    this.moreVideos(9);
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
</style>
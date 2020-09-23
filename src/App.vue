<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app temporary>
      <v-list dense>
        <v-list-item :to="link.url" v-for="link of links" :key="link.title">
          <v-list-item-action>
            <v-icon>{{link.icon}}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{link.title}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="onLogout" v-if="isUserLoggedIn">
          <v-list-item-action>
            <v-icon>{{mdiLogoutVariant}}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="indigo" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" class="hidden-md-and-up"></v-app-bar-nav-icon>
      <v-toolbar-title>
        <a
          href="https://vgaimanovskyi.github.io/thread-master/"
          class="white--text text-decoration-none"
          target="_black"
        >Thread-master</a>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn x-small :to="link.url" v-for="link of links" :key="link.title" text>
          <v-icon left>{{link.icon}}</v-icon>
          {{link.title}}
        </v-btn>
        <v-btn x-small @click="onLogout" text v-if="isUserLoggedIn">
          <v-icon left>{{mdiLogoutVariant}}</v-icon>Logout
        </v-btn>
      </v-toolbar-items>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>

    <v-footer color="indigo" app>
      <span class="text-body-2 white--text d-flex align-center">
        &copy;
        <v-btn
          href="https://github.com/vgaimanovskyi"
          text
          target="_blank"
          class="px-2 text-body-2"
          color="white"
        >Vadym Haimanovshyi</v-btn>
        {{ new Date().getFullYear() }}
      </span>
    </v-footer>

    <template v-if="error">
      <v-snackbar
        :color="'error'"
        :multi-line="true"
        :timeout="5000"
        @input="snackbar = false"
        :value="true"
      >
        {{error}}
        <template v-slot:action="{ attrs }">
          <v-btn dark text v-bind="attrs" @click="snackbar = false">Close</v-btn>
        </template>
      </v-snackbar>
    </template>

    <v-btn fixed dark fab bottom right color="pink" @click="scrollTop">
      <v-icon>mdi-arrow-up</v-icon>
    </v-btn>
  </v-app>
</template>

<script>
import { mdiLock } from "@mdi/js";
import { mdiCart } from "@mdi/js";
import { mdiMessage } from "@mdi/js";
import { mdiFileImageOutline } from "@mdi/js";
import { mdiImagePlus } from "@mdi/js";
import { mdiLogoutVariant } from "@mdi/js";
import { mdiYoutube } from "@mdi/js";
import { mdiYoutubeStudio } from "@mdi/js";

export default {
  data() {
    return {
      drawer: false,
      mdiLogoutVariant,
    };
  },
  computed: {
    error() {
      return this.$store.getters.getError;
    },
    isUserLoggedIn() {
      return this.$store.getters.isUserLoggedIn;
    },
    links() {
      if (this.isUserLoggedIn) {
        return [
          { title: "Заказы", icon: mdiCart, url: "/orders" },
          { title: "Отзывы", icon: mdiMessage, url: "/reviews" },
          { title: "Товар", icon: mdiFileImageOutline, url: "/products" },
          {
            title: "Новый товар",
            icon: mdiImagePlus,
            url: "/add-product",
          },
          { title: "Видео", icon: mdiYoutube, url: "/videos" },
          {
            title: "Новое видео",
            icon: mdiYoutubeStudio,
            url: "/add-video",
          },
        ];
      } else {
        return [{ title: "Login", icon: mdiLock, url: "/login" }];
      }
    },
  },
  methods: {
    closeError() {
      this.$store.dispatch("clearError");
    },
    async onLogout() {
      await this.$store.dispatch("logoutUser");
      this.$router.push("/login");
    },
    scrollTop() {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },
  },
};
</script>

<style lang="scss">
@media screen and (min-width: 600px) {
  .border {
    border-right: 1px solid #1976d2;
  }
}
</style>
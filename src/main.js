import Vue from 'vue';
import App from './App.vue';
import store from './store';
import router from './router';
import vuetify from './plugins/vuetify';
import dateFilter from './filters/date';
import VueMeta from 'vue-meta'
import './registerServiceWorker';


import * as firebase from "firebase/app";
import "firebase/database";
import 'firebase/storage';
import "firebase/auth";

Vue.config.productionTip = false;
Vue.filter("date", dateFilter);
Vue.use(VueMeta)

firebase.initializeApp({
  apiKey: "AIzaSyC8Cd8xpvEKXh8vjvMtpTB0fdcP7wzBRGc",
  authDomain: "threadmaster-affcd.firebaseapp.com",
  databaseURL: "https://threadmaster-affcd.firebaseio.com",
  projectId: "threadmaster-affcd",
  storageBucket: "threadmaster-affcd.appspot.com",
  messagingSenderId: "351973733556",
  appId: "1:351973733556:web:8b22c8303ca8d9a03a93e1",
  measurementId: "G-BCF66P2GP6"
});

export const db = firebase.database();
export const fs = firebase.storage();
export const fa = firebase.auth();

let app;

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      vuetify,
      render: h => h(App),
      async created() {
        await this.$store.dispatch("autoLoginUser");
      },
    }).$mount('#app')
  }
})

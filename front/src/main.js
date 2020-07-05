import Vue from "vue";
import VueResource from "vue-resource";
import AsyncComputed from "vue-async-computed";

// Bootstrap import
import { BootstrapVue, BootstrapVueIcons } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

import App from "./App.vue";

Vue.use(VueResource);
Vue.use(AsyncComputed);
Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);

new Vue({
  http: {
    root: "http://localhost:3000/",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers":
        "Access-Control-Allow-Methods, Access-Control-Allow-Origin, Origin, Accept, Content-Type",
      "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    }
  },
  el: "#app",
  render: h => h(App)
});

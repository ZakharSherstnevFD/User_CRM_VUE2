import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

import Home from "./pages/TheHome.vue";
import Users from "./pages/TheUsers.vue";
import NoteFound from "./pages/TheNotFound.vue";

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/users",
      name: "users",
      component: Users,
    },
    {
      path: "*",
      name: "noteFound",
      component: NoteFound,
    },
  ],
});

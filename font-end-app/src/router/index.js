import { createRouter, createWebHistory } from "vue-router";
// admin
import HomeAdminView from "../views/admin/HomeView.vue";
import AddUserView from "../views/admin/AddView.vue";
import UpdateUserView from "../views/admin/UpdateView.vue";
import AccetUserView from "../views/admin/AccetView.vue";
import HistoryView from "../views/admin/HistoryView.vue";
import LoginView from "../views/client/LoginView.vue";
// client
import HomeView from "../views/client/HomeView.vue";
import AboutClientView from "../views/client/AboutView.vue";
import ConfirmView from "../views/client/ConfirmView.vue";
import LayoutAdminView from "@/views/layout/LayoutAdminView.vue";
import LayoutClientView from "@/views/layout/LayoutClientView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "homeClient",
      component: LayoutClientView,
      children: [
        {
          path: "",
          name: "homeClient",
          // route level code-splitting
          // this generates a separate chunk (About.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: HomeView,
        },
        {
          path: "/confirm",
          name: "confirm",
          // route level code-splitting
          // this generates a separate chunk (About.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: ConfirmView,
        },
        {
          path: "/login",
          name: "login",
          // route level code-splitting
          // this generates a separate chunk (About.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: LoginView,
        },
        {
          path: "/logout",
          name: "logout",
          // route level code-splitting
          // this generates a separate chunk (About.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: LoginView,
        },
      ],
    },
    {
      path: "/admin",
      name: "home",
      component: LayoutAdminView,
      children: [
        {
          path: "",
          name: "home",
          // route level code-splitting
          // this generates a separate chunk (About.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: HomeAdminView,
        },
        {
          path: "/add",
          name: "addUser",
          // route level code-splitting
          // this generates a separate chunk (About.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: AddUserView,
        },
        {
          path: "/fix/:id",
          name: "fix",
          // route level code-splitting
          // this generates a separate chunk (About.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: UpdateUserView,
        },
        {
          path: "/accet",
          name: "accet",
          // route level code-splitting
          // this generates a separate chunk (About.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: AccetUserView,
        },
        {
          path: "/history",
          name: "history",
          // route level code-splitting
          // this generates a separate chunk (About.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: HistoryView,
        },
        {
          path: "/login",
          name: "login",
          // route level code-splitting
          // this generates a separate chunk (About.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: LoginView,
        },
        {
          path: "/logout",
          name: "logout",
          // route level code-splitting
          // this generates a separate chunk (About.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: LoginView,
        },
      ],
    },
  ],
});

export default router;

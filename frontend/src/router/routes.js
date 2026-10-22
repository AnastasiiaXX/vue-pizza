export default [
  {
    path: "/",
    name: "home",
    component: () => import("@/views/HomeView.vue"),
    meta: { layout: "DefaultLayout" },
  },
  {
    path: "/login",
    name: "login",
    meta: { layout: "SimpleLayout" },
    component: () => import("@/views/LoginView.vue"),
  },
  {
    path: "/cart",
    name: "cart",
    meta: { layout: "DefaultLayout" },
    component: () => import("@/views/CartView.vue"),
  },
  {
    path: "/user",
    name: "user",
    meta: { layout: "DefaultLayout" },
    component: () => import("@/views/UserView.vue"),
    children: [
      {
        path: "orders",
        name: "orders",
        component: () => import("@/views/OrdersView.vue"),
      },
      {
        path: "profile",
        name: "profile",
        component: () => import("@/views/ProfileView.vue"),
      },
    ],
  },
];

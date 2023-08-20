import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import ProductView from "../views/ProductView.vue";
import DeliveryView from "../views/DeliveryView.vue";
import PaymentView from "../views/PaymentView.vue";
import VacationView from "../views/VacationView.vue";
import SupportView from "../views/SupportView.vue";
import ProductByIdView from "../views/ProductByIdView.vue";
import notFoundView from "../views/notFoundView.vue";

const routes = [
   {
      path: "/",
      name: "home",
      component: HomeView,
   },
   {
      path: "/products",
      name: "products",
      component: ProductView,
   },
   {
      path: "/delivery",
      name: "delivery",
      component: DeliveryView,
   },
   {
      path: "/payment",
      name: "payment",
      component: PaymentView,
   },
   {
      path: "/vacation",
      name: "vacation",
      component: VacationView,
   },
   {
      path: "/support",
      name: "support",
      component: SupportView,
   },
   {
      path: "/product/:id",
      name: "product",
      component: ProductByIdView,
   },
   {
      path: "/:pathMatch(.*)*",
      name: "not-found",
      component: notFoundView,
   },
];

const router = createRouter({
   history: createWebHistory(process.env.BASE_URL),
   routes,
});

export default router;

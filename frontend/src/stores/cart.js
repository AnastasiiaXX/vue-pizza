import { defineStore } from "pinia";
export const useCartStore = defineStore("cart", {
  state: () => ({
    pizzas: [],
    misc: [],
    address: {
      street: "",
      building: "",
      flat: "",
      comment: "",
    },
    phone: "",
  }),
  getters: {},
  actions: {},
});

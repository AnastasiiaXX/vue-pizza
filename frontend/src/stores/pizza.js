import { defineStore } from "pinia";
export const usePizzaStore = defineStore("pizza", {
  state: () => ({
    name: "",
    doughId: 0,
    sizeId: 0,
    sauceId: 0,
    ingredients: {},
  }),
  getters: {},
  actions: {},
});

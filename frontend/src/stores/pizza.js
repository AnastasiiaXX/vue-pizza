import { defineStore } from "pinia";
import { useDataStore } from "./data";
import countPizzaPrice from "../common/helpers/countPizzaPrice.js";

export const usePizzaStore = defineStore("pizza", {
  state: () => ({
    index: null,
    name: "",
    doughId: 0,
    sizeId: 0,
    sauceId: 0,
    ingredients: {},
  }),
  getters: {
    getTotalPrice: (state) => countPizzaPrice(state, useDataStore()),
  },
  actions: {},
});

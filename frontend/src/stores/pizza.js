import { defineStore } from "pinia";
import { useDataStore } from "./data";
import countPizzaPrice from "../common/helpers/countPizzaPrice.js";
import { MAX_INGREDIENT_COUNT } from "../common/constants/index.js";

export const usePizzaStore = defineStore("pizza", {
  state: () => ({
    index: null,
    name: "",
    doughId: 1,
    sizeId: 2,
    sauceId: 1,
    ingredients: {},
  }),
  getters: {
    getTotalPrice: (state) => countPizzaPrice(state, useDataStore()),
    getDough: (state) => {
      const data = useDataStore();
      return (
        data.doughItems.find((item) => item.id === state.doughId) ??
        data.doughItems[0]
      );
    },
    getSauce: (state) => {
      const data = useDataStore();
      return (
        data.sauceItems.find((item) => item.id === state.sauceId) ??
        data.sauceItems[0]
      );
    },
  },
  actions: {
    setIngredientCount(name, count) {
      this.ingredients[name] = count;
    },
    dropIngredients(ingredient) {
      const ingredientName = ingredient.value;
      const count = this.ingredients[ingredientName] ?? 0;
      if (count < MAX_INGREDIENT_COUNT) {
        this.setIngredientCount(ingredientName, count + 1);
      }
    },
    setDough(id) {
      this.doughId = id;
    },
    setSize(id) {
      this.sizeId = id;
    },
    setSauce(id) {
      this.sauceId = id;
    },
    setName(pizzaName) {
      this.name = pizzaName;
    },
    loadPizza(pizza) {
      this.index = pizza.index;
      this.name = pizza.name;
      this.doughId = pizza.doughId;
      this.sizeId = pizza.sizeId;
      this.sauceId = pizza.sauceId;
      this.ingredients = { ...pizza.ingredients };
    },
  },
});

import { defineStore } from "pinia";
import { useDataStore } from "./data";
import countPizzaPrice from "../common/helpers/countPizzaPrice.js";
import { MAX_INGREDIENT_COUNT } from "../common/constants/index.js";

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
  },
});

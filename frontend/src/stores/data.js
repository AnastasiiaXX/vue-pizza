import { defineStore } from "pinia";
import dough from "@/mocks/dough.json";
import sizes from "@/mocks/sizes.json";
import ingredients from "@/mocks/ingredients.json";
import sauces from "@/mocks/sauces.json";
import misc from "@/mocks/misc.json";

import doughSizes from "@/common/data/doughSizes.js";
import pizzaSizes from "@/common/data/sizes.js";
import ingredientsEnglishNames from "@/common/data/ingredients.js";
import saucesEnglishNames from "@/common/data/sauces.js";
import normalize from "@/common/helpers/normalize.js";
export const useDataStore = defineStore("data", {
  state: () => ({
    doughItems: dough.map((item) => normalize(item, doughSizes)),
    sauceItems: sauces.map((item) => normalize(item, saucesEnglishNames)),
    sizeItems: sizes.map((item) => normalize(item, pizzaSizes)),

    ingredientItems: ingredients.map((ingredient) =>
      normalize(ingredient, ingredientsEnglishNames),
    ),
    misc: misc,
  }),
});

<script setup>
import { reactive, computed } from "vue";
import { MAX_INGREDIENT_COUNT } from "@/common/constants/index.js";

import dough from "@/mocks/dough.json";
import sizes from "@/mocks/sizes.json";
import ingredients from "@/mocks/ingredients.json";
import sauces from "@/mocks/sauces.json";

import doughSizes from "@/common/data/doughSizes.js";
import pizzaSizes from "@/common/data/sizes.js";
import ingredientsEnglishNames from "@/common/data/ingredients.js";
import saucesEnglishNames from "@/common/data/sauces.js";
import normalize from "@/common/helpers/normalize.js";

import DoughSelector from "@/modules/constructor/DoughSelector.vue";
import DiameterSelector from "@/modules/constructor/DiameterSelector.vue";
import SauceSelector from "@/modules/constructor/SauceSelector.vue";
import IngredientSelector from "@/modules/constructor/IngredientSelector.vue";
import PizzaConstructor from "@/modules/constructor/PizzaConstructor.vue";

const pizza = reactive({
  name: "",
  dough: "light",
  size: "normal",
  sauce: "tomato",
  ingredients: {},
});

const doughItems = dough.map((item) => normalize(item, doughSizes));
const sauceItems = sauces.map((item) => normalize(item, saucesEnglishNames));
const sizeItems = sizes.map((item) => normalize(item, pizzaSizes));

const ingredientItems = ingredients.map((ingredient) =>
  normalize(ingredient, ingredientsEnglishNames),
);

const sizeMultiplier = computed(
  () => sizeItems.find((item) => item.value === pizza.size)?.multiplier ?? 1,
);
const doughPrice = computed(
  () => doughItems.find((item) => item.value === pizza.dough)?.price ?? 0,
);
const saucePrice = computed(
  () => sauceItems.find((item) => item.value === pizza.sauce)?.price ?? 0,
);
const ingredientsPrice = computed(() =>
  ingredientItems
    .map((item) => item.price * (pizza.ingredients[item.value] ?? 0))
    .reduce((total, number) => total + number, 0),
);
const price = computed(
  () =>
    (doughPrice.value + saucePrice.value + ingredientsPrice.value) *
    sizeMultiplier.value,
);

const disableSubmit = computed(
  () => pizza.name.length === 0 || price.value === 0,
);

function updateIngredients(name, count) {
  pizza.ingredients[name] = count;
}

function dropIngredients(ingredient) {
  const ingredientName = ingredient.value;
  const count = pizza.ingredients[ingredientName] ?? 0;
  if (count < MAX_INGREDIENT_COUNT) {
    pizza.ingredients[ingredientName] = count + 1;
  }
}
</script>

<template>
  <main class="content">
    <form action="#" method="post">
      <div class="content__wrapper">
        <h1 class="title title--big">Конструктор пиццы</h1>
        <dough-selector
          v-model="pizza.dough"
          :items="doughItems"
        ></dough-selector>
        <diameter-selector
          v-model="pizza.size"
          :items="sizeItems"
        ></diameter-selector>

        <div class="content__ingredients">
          <div class="sheet">
            <h2 class="title title--small sheet__title">
              Выберите ингредиенты
            </h2>

            <div class="sheet__content ingredients">
              <sauce-selector
                v-model="pizza.sauce"
                :items="sauceItems"
              ></sauce-selector>
              <ingredient-selector
                :items="ingredientItems"
                :counts="pizza.ingredients"
                @update="updateIngredients"
              ></ingredient-selector>
            </div>
          </div>
        </div>

        <pizza-constructor
          v-model="pizza.name"
          :dough="pizza.dough"
          :sauce="pizza.sauce"
          :counts="pizza.ingredients"
          :price="price"
          :disabled="disableSubmit"
          @drop="dropIngredients"
        ></pizza-constructor>
      </div>
    </form>
  </main>
</template>

<style lang="scss">
@import "@/assets/scss/ds-system/ds.scss";
@import "@/assets/scss/mixins/mixins.scss";

.content {
  padding-top: 20px;
}

.content__wrapper {
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;

  width: 920px;
  margin: 0 auto;
  padding-right: 2.12%;
  padding-bottom: 30px;
  padding-left: 2.12%;
}

.content__dough {
  width: 527px;
  margin-top: 15px;
  margin-right: auto;
  margin-bottom: 15px;
}

.content__diameter {
  width: 373px;
  margin-top: 15px;
  margin-bottom: 15px;
}

.content__ingredients {
  width: 527px;
  margin-top: 15px;
  margin-right: auto;
  margin-bottom: 15px;
}

.content__pizza {
  width: 373px;
  margin-top: 15px;
  margin-bottom: 15px;
}

.content__constructor {
  width: 315px;
  margin-top: 25px;
  margin-right: auto;
  margin-left: auto;
}

.content__result {
  display: flex;
  align-items: center;
  justify-content: center;

  margin-top: 25px;

  p {
    @include b-s24-h28;

    margin: 0;
  }

  button {
    margin-left: 12px;
    padding: 16px 45px;
  }
}



.sheet__title {
  padding-right: 18px;
  padding-left: 18px;
}

.sheet__content {
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  margin-top: 8px;
  padding-top: 18px;
  padding-right: 18px;
  padding-left: 18px;

  border-top: 1px solid rgba($green-500, 0.1);
}

.ingredients__sauce {
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  width: 100%;
  margin-bottom: 14px;

  p {
    @include r-s16-h19;

    margin-top: 0;
    margin-right: 16px;
    margin-bottom: 10px;
  }
}

.ingredients__input {
  margin-right: 24px;
  margin-bottom: 10px;
}

.ingredients__filling {
  width: 100%;

  p {
    @include r-s16-h19;

    margin-top: 0;
    margin-bottom: 16px;
  }
}



.ingredients__list {
  @include clear-list;

  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
}

.ingredients__item {
  width: 100px;
  min-height: 40px;
  margin-right: 17px;
  margin-bottom: 35px;
}

.ingredients__counter {
  width: 54px;
  margin-top: 10px;
  margin-left: 36px;
}

.radio {
  cursor: pointer;

  span {
    @include r-s16-h19;

    position: relative;

    padding-left: 28px;

    &:before {
      @include p_center-v;

      display: block;

      box-sizing: border-box;
      width: 20px;
      height: 20px;

      content: "";
      transition: 0.3s;

      border: 1px solid $purple-400;
      border-radius: 50%;
      background-color: $white;
    }
  }

  &:hover {
    input:not(:checked):not(:disabled) + span {
      &:before {
        border-color: $purple-800;
      }
    }
  }

}
</style>

<script setup>
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { useCartStore } from "../stores";
import { usePizzaStore } from "../stores";
import { useProfileStore } from "../stores";
import AppCounter from "@/common/components/AppCounter.vue";
import AppPopup from "@/common/components/AppPopup.vue";
import getImage from "@/common/helpers/getImage.js";

const cartStore = useCartStore();
const pizzaStore = usePizzaStore();
const profileStore = useProfileStore();
const popup = ref(false);
const deliveryOption = ref("self");
const router = useRouter();

const phone = computed({
  get() {
    return cartStore.phone;
  },
  set(value) {
    cartStore.setPhone(value);
  },
});

const closePopup = () => {
  cartStore.$reset();
  router.push({ name: "home" });
};

const editPizza = (index) => {
  pizzaStore.loadPizza({
    ...cartStore.pizzas[index],
    index,
  });
  router.push({ name: "home" });
};
</script>
<template>
  <form action="test.html" method="post" class="layout-form">
    <main class="content cart">
      <div class="container">
        <div class="cart__title">
          <h1 class="title title--big">Корзина</h1>
        </div>

        <div v-if="cartStore.pizzas.length === 0" class="sheet cart__empty">
          <p>В корзине нет ни одного товара</p>
        </div>
        <template v-else>
          <ul class="cart-list sheet">
            <li
              v-for="(pizza, index) in cartStore.getPizzasExtended"
              :key="index"
              class="cart-list__item"
            >
              <div class="product cart-list__product">
                <img
                  src="@/assets/img/product.svg"
                  class="product__img"
                  width="56"
                  height="56"
                  :alt="pizza.name"
                />
                <div class="product__text">
                  <h2>{{ pizza.name }}</h2>
                  <ul>
                    <li>{{ pizza.size.name }}, {{ pizza.dough.name }} тесто</li>
                    <li>Соус: {{ pizza.sauce.name }}</li>
                    <li>
                      Начинка:
                      {{
                        pizza.ingredients
                          .map((ingredient) => ingredient.name)
                          .join(", ")
                      }}
                    </li>
                  </ul>
                </div>
              </div>

              <app-counter
                class="cart-list__counter"
                :count="pizza.quantity"
                accent
                @update="cartStore.setPizzaCount(index, $event)"
              >
              </app-counter>

              <div class="cart-list__price">
                <b>{{ pizza.price }} ₽</b>
              </div>

              <div class="cart-list__button">
                <button
                  type="button"
                  class="cart-list__edit"
                  @click="editPizza(index)"
                >
                  Изменить
                </button>
              </div>
            </li>
          </ul>

          <div class="cart__additional">
            <ul class="additional-list">
              <li
                v-for="item in cartStore.getMiscExtended"
                :key="item.id"
                class="additional-list__item sheet"
              >
                <p class="additional-list__description">
                  <img
                    :src="getImage(item.image)"
                    width="39"
                    height="60"
                    :alt="item.name"
                  />
                  <span>{{ item.name }}</span>
                </p>

                <div class="additional-list__wrapper">
                  <app-counter
                    class="additional-list__counter"
                    :count="item.quantity"
                    accent
                    @update="cartStore.setMiscCount(item.id, $event)"
                  >
                  </app-counter>

                  <div class="additional-list__price">
                    <b>× {{ item.price }} ₽</b>
                  </div>
                </div>
              </li>
            </ul>
          </div>

          <div class="cart__form">
            <div class="cart-form">
              <label class="cart-form__select">
                <span class="cart-form__label">Получение заказа:</span>

                <select v-model="deliveryOption" name="test" class="select">
                  <option value="self">Заберу сам</option>
                  <option value="new">Новый адрес</option>
                  <option
                    v-for="address in profileStore.addresses"
                    :key="address.id"
                    :value="address.id"
                  >
                    {{ address.name }}
                  </option>
                </select>
              </label>

              <label class="input input--big-label">
                <span>Контактный телефон:</span>
                <input
                  v-model="phone"
                  type="text"
                  name="tel"
                  placeholder="+7 999-999-99-99"
                />
              </label>

              <div v-if="deliveryOption === 'new'" class="cart-form__address">
                <span class="cart-form__label">Новый адрес:</span>

                <div class="cart-form__input">
                  <label class="input">
                    <span>Улица*</span>
                    <input
                      type="text"
                      name="street"
                      :value="cartStore.address.street"
                      @input="
                        cartStore.setAddressField('street', $event.target.value)
                      "
                    />
                  </label>
                </div>

                <div class="cart-form__input cart-form__input--small">
                  <label class="input">
                    <span>Дом*</span>
                    <input
                      type="text"
                      name="house"
                      :value="cartStore.address.building"
                      @input="
                        cartStore.setAddressField(
                          'building',
                          $event.target.value,
                        )
                      "
                    />
                  </label>
                </div>

                <div class="cart-form__input cart-form__input--small">
                  <label class="input">
                    <span>Квартира</span>
                    <input
                      type="text"
                      name="apartment"
                      :value="cartStore.address.flat"
                      @input="
                        cartStore.setAddressField('flat', $event.target.value)
                      "
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>
        </template>
      </div>
    </main>
    <template v-if="cartStore.pizzas.length > 0">
      <section class="footer">
        <div class="footer__more">
          <router-link
            :to="{ name: 'home' }"
            class="button button--border button--arrow"
          >
            Хочу еще одну
          </router-link>
        </div>
        <p class="footer__text">
          Перейти к конструктору<br />чтоб собрать ещё одну пиццу
        </p>
        <div class="footer__price">
          <b>Итого: {{ cartStore.getTotal }} ₽</b>
        </div>

        <div class="footer__submit">
          <button type="button" class="button" @click="popup = true">
            Оформить заказ
          </button>
        </div>
      </section>
    </template>
    <app-popup v-if="popup" @close="closePopup"></app-popup>
  </form>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/ds-system/ds-colors";
@import "@/assets/scss/ds-system/ds-shadows";
@import "@/assets/scss/ds-system/ds-typography";
@import "@/assets/scss/mixins/m_center";
@import "@/assets/scss/mixins/m_clear-list";

.layout-form {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.cart__title {
  margin-bottom: 15px;
}

.cart__additional {
  margin-top: 15px;
  margin-bottom: 25px;
}

.cart__empty {
  padding: 20px 30px;
}

.additional-list {
  @include clear-list;

  display: flex;
  flex-wrap: wrap;
}

.additional-list__description {
  display: flex;
  align-items: flex-start;
  margin: 0;
  margin-bottom: 8px;
}

.additional-list__item {
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  width: 200px;
  margin-right: 15px;
  margin-bottom: 15px;
  padding-top: 15px;
  padding-bottom: 15px;

  img {
    margin-right: 10px;
    margin-left: 15px;
  }

  span {
    @include b-s14-h16;

    display: inline;
    width: 100px;
    margin-right: 15px;
  }
}

.additional-list__wrapper {
  display: flex;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  margin-top: auto;
  padding-top: 18px;
  padding-right: 15px;
  padding-left: 15px;
  border-top: 1px solid rgba($green-500, 0.1);
}

.additional-list__counter {
  width: 54px;
  margin-right: auto;
}

.additional-list__price {
  @include b-s16-h19;
}

.select {
  @include r-s16-h19;

  display: block;
  margin: 0;
  padding: 8px 16px;
  padding-right: 30px;
  cursor: pointer;
  transition: 0.3s;
  color: $black;
  border: 1px solid $purple-400;
  border-radius: 8px;
  outline: none;
  background-color: $silver-100;
  background-image: url("@/assets//img/select.svg");
  background-repeat: no-repeat;
  background-position: right 8px center;
  font-family: inherit;
  appearance: none;

  &:hover {
    border-color: $orange-100;
  }

  &:focus {
    border-color: $green-500;
  }
}

.cart-form {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}

.cart-form__select {
  display: flex;
  align-items: center;
  margin-right: auto;

  span {
    margin-right: 16px;
  }
}

.cart-form__label {
  @include b-s16-h19;

  white-space: nowrap;
}

.cart-form__address {
  display: flex;
  align-items: center;
  width: 100%;
  margin-top: 20px;
}

.cart-form__input {
  flex-grow: 1;
  margin-bottom: 20px;
  margin-left: 16px;

  &--small {
    max-width: 120px;
  }
}

.cart-list {
  @include clear-list;

  padding: 15px 0;
}

.cart-list__item {
  display: flex;
  align-items: flex-start;
  margin-bottom: 15px;
  padding-right: 15px;
  padding-bottom: 15px;
  padding-left: 15px;
  border-bottom: 1px solid rgba($green-500, 0.1);

  &:last-child {
    margin-bottom: 0;
    padding-bottom: 0;
    border-bottom: none;
  }
}

.cart-list__product {
  flex-grow: 1;
  margin-right: auto;
}

.cart-list__counter {
  width: 54px;
  margin-right: auto;
  margin-left: 20px;
}

.cart-list__price {
  min-width: 100px;
  margin-right: 36px;
  margin-left: 10px;
  text-align: right;

  b {
    @include b-s16-h19;
  }
}

.cart-list__edit {
  @include l-s11-h13;

  cursor: pointer;
  transition: 0.3s;
  border: none;
  outline: none;
  background-color: transparent;

  &:hover {
    color: $green-500;
  }

  &:active {
    color: $green-600;
  }

  &:focus {
    color: $green-400;
  }
}

.footer {
  display: flex;
  align-items: center;
  margin-top: auto;
  padding: 25px 2.12%;
  background-color: rgba($green-500, 0.1);
}

.footer__more {
  width: 220px;
  margin-right: 16px;

  a {
    padding-top: 16px;
    padding-bottom: 16px;
  }
}

.footer__text {
  @include l-s11-h13;

  color: rgba($black, 0.5);
}

.footer__price {
  @include b-s24-h28;

  margin-right: 12px;
  margin-left: auto;
}

.footer__submit {
  button {
    padding: 16px 14px;
  }
}
</style>

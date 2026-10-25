import { defineStore } from "pinia";
import { useDataStore } from "./data";
import countPizzaPrice from "../common/helpers/countPizzaPrice";
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
  getters: {
    getMiscPrice: (state) => {
      const data = useDataStore();
      return state.misc.reduce((total, item) => {
        const price = data.misc.find((m) => m.id === item.miscId)?.price ?? 0;
        return total + price * item.quantity;
      }, 0);
    },
    getPizzasPrice: (state) => {
      const data = useDataStore();
      return state.pizzas.reduce((total, item) => {
        return total + countPizzaPrice(item, data) * item.quantity;
      }, 0);
    },
    getTotal: (state) => state.getMiscPrice + state.getPizzasPrice,
    getPizzasExtended: (state) => {
      const data = useDataStore();
      return state.pizzas.map((pizza) => ({
        name: pizza.name,
        quantity: pizza.quantity,
        dough: data.doughItems.find((item) => item.id === pizza.doughId),
        size: data.sizeItems.find((item) => item.id === pizza.sizeId),
        sauce: data.sauceItems.find((item) => item.id === pizza.sauceId),
        price: countPizzaPrice(pizza, data),
        ingredients: data.ingredientItems.filter(
          (item) => pizza.ingredients[item.value] > 0,
        ),
      }));
    },
    getMiscExtended: (state) => {
      const data = useDataStore();
      return data.misc.map((item) => ({
        ...item,
        quantity:
          state.misc.find((misc) => misc.miscId === item.id)?.quantity ?? 0,
      }));
    },
  },
  actions: {
    setMiscCount(miscId, newCount) {
      const index = this.misc.findIndex((item) => item.miscId === miscId);
      if (index === -1 && newCount > 0) {
        this.misc.push({ miscId, quantity: newCount });
        return;
      }
      if (index !== -1 && newCount === 0) {
        this.misc.splice(index, 1);
        return;
      }
      if (index !== -1 && newCount > 0) {
        this.misc[index].quantity = newCount;
      }
    },
    setPizzaCount(index, newCount) {
      if (!this.pizzas[index]) {
        return;
      }
      if (newCount === 0) {
        this.pizzas.splice(index, 1);
        return;
      }
      this.pizzas[index].quantity = newCount;
    },
    savePizza(pizza) {
      if (pizza.index !== null) {
        const quantity = this.pizzas[pizza.index].quantity;
        this.pizzas[pizza.index] = {
          ...pizza,
          quantity: quantity,
          ingredients: { ...pizza.ingredients },
        };
      } else {
        this.pizzas.push({
          ...pizza,
          quantity: 1,
          ingredients: { ...pizza.ingredients },
        });
      }
    },
    setPhone(phone) {
      this.phone = phone;
    },
    setAddressField(field, value) {
      this.address[field] = value;
    },
  },
});

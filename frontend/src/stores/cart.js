import { defineStore } from "pinia";
import {useDataStore} from "./data";
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
        return total + countPizzaPrice(item, data) * item.quantity
      }, 0);
    },
  },
  getTotal: (state) => state.getMiscPrice + state.getPizzasPrice,
  actions: {},
});

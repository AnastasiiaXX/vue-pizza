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
  },
  getTotal: (state) => state.getMiscPrice + state.getPizzasPrice,
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
  },
});

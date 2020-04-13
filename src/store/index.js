import Vue from "vue";
import Vuex from "vuex";

import calculate from "./calculate";
import defaultOptions from "./defaultOptions.js";

Vue.use(Vuex);

const localState = {
  options: defaultOptions,
  availableWeights: [],
  calculatedResults: []
};

const localMutations = {
  increment(state, args) {
    state.options.plates.find(x => x.id === args.id).quantity++;
  },
  decrement(state, args) {
    state.options.plates.find(x => x.id === args.id).quantity--;
  },
  setBarWeight(state, args) {
    Vue.set(state.options, "barWeight", args.barWeight);
  }
};

const localActions = {
  increment(context, args) {
    context.commit("increment", args);

    context.dispatch("calculate");
  },
  decrement(context, args) {
    context.commit("decrement", args);

    context.dispatch("calculate");
  },
  setBarWeight(context, args) {
    context.commit("setBarWeight", args);

    context.dispatch("calculate");
  },
  calculate(context) {
    context.state.calculatedResults = [];

    const availableWeights = [];

    for (let i = 35; i <= 405; i += 5) {
      const pairs = context.state.options.plates.map(x => ({
        weight: parseFloat(x.weight),
        quantity: parseInt(x.quantity)
      }));

      const res = calculate(pairs, context.state.options.barWeight, i);
      availableWeights.push({
        weight: i,
        isDisabled: res.isSuccess === false
      });

      context.state.calculatedResults.push(res);
    }

    Vue.set(context.state, "availableWeights", availableWeights);
  }
};

export default new Vuex.Store({
  state: localState,
  getters: {
    getOptionById: state => id => {
      return state.options.plates.find(x => x.id === id);
    },
    getResultByWeight: state => weight => {
      return state.calculatedResults.find(x => x.weight === weight);
    }
  },
  mutations: localMutations,
  actions: localActions,
  modules: {}
});

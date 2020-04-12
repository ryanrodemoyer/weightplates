import Vue from "vue";
import Vuex from "vuex";

import defaultOptions from "./defaultOptions.js";

Vue.use(Vuex);

const calculate = (inventory, barWeight, targetWeight) => {
  const results = {};

  let weight = parseInt(targetWeight) - barWeight;

  inventory.forEach(pair => {
    results[pair.weight] = 0;

    let canUse = false;
    do {
      canUse = pair.quantity >= 1 && weight - 2 * pair.weight >= 0;
      if (canUse) {
        results[pair.weight] = results[pair.weight] + 1;

        pair.quantity--;
        weight -= pair.weight * 2;
      }
    } while (canUse === true);
  });

  return {
    weight: targetWeight,
    totalWeight: targetWeight - weight,
    isSuccess: weight === 0,
    ...results
  };
};

// function pairs() {
//   const PAIRS = [
//     { weight: 45, quantity: 4 },
//     { weight: 35, quantity: 1 },
//     { weight: 25, quantity: 1 },
//     { weight: 15, quantity: 1 },
//     { weight: 10, quantity: 1 },
//     { weight: 5, quantity: 1 },
//     { weight: 2.5, quantity: 1 }
//   ];

//   return PAIRS;
// }

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

let isFirstTime = true;

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

    for (let i = 35; i <= 405; i += 5) {
      const pairs = context.state.options.plates.map(x => ({
        weight: parseFloat(x.weight),
        quantity: parseInt(x.quantity)
      }));

      if (isFirstTime) {
        context.state.availableWeights.push(i);
      }

      const res = calculate(pairs, context.state.options.barWeight, i);
      context.state.calculatedResults.push(res);
    }

    isFirstTime = false;
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

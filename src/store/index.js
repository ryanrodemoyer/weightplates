import Vue from "vue";
import Vuex from "vuex";

import defaultOptions from "./defaultOptions.js";

Vue.use(Vuex);

const calculate = (inventory, barWeight, targetWeight) => {
  const results = {};

  // // seed the results so less checking to do in the actual code
  // inventory.forEach(p => {
  // });

  let weight = parseInt(targetWeight) - barWeight;

  inventory.forEach(pair => {
    results[pair.weight] = 0;

    let canUse = false;
    do {
      canUse = pair.quantity >= 1 && weight - 2 * pair.weight >= 0;
      // canUse = weight >= pair.quantity * 2 * pair.weight;
      // console.log(`${canUse}: ${weight} - ${2 * pair.weight} >= 0`)
      if (canUse) {
        results[pair.weight] = results[pair.weight] + 1;

        pair.quantity--;
        weight -= pair.weight * 2;
        // console.log(`remaining weight ${weight}`)
      }
    } while (canUse === true);
  });

  return { weight: targetWeight, ...results };
};

const BAR = 45;

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
    state.options.find(x => x.id === args.id).quantity++;
  },
  decrement(state, args) {
    state.options.find(x => x.id === args.id).quantity--;
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
    context.store.dispatch("calculate");
  },
  calculate(context) {
    context.state.calculatedResults = [];

    for (let i = BAR + 5; i <= 405; i += 5) {
      const pairs = context.state.options.map(x => ({
        weight: parseFloat(x.weight),
        quantity: parseInt(x.quantity)
      }));

      if (isFirstTime) {
        context.state.availableWeights.push(i);
      }

      const res = calculate(pairs, BAR, i);
      context.state.calculatedResults.push(res);
    }

    isFirstTime = false;
  }
};

export default new Vuex.Store({
  state: localState,
  getters: {
    getOptionById: state => id => {
      return state.options.find(x => x.id === id);
    },
    getResultByWeight: state => weight => {
      return state.calculatedResults.find(x => x.weight === weight);
    }
  },
  mutations: localMutations,
  actions: localActions,
  modules: {}
});

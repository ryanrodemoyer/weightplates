import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const calculate = (inventory, barWeight, targetWeight) => {
  const results = {};

  // seed the results so less checking to do in the actual code
  inventory.forEach(p => {
    results[p.weight] = 0;
  });

  let weight = targetWeight - barWeight;

  inventory.forEach(pair => {
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

  return results;
};

const BAR = 45;

function pairs() {
  const PAIRS = [
    { weight: 45, quantity: 4 },
    { weight: 35, quantity: 1 },
    { weight: 25, quantity: 1 },
    { weight: 15, quantity: 1 },
    { weight: 10, quantity: 1 },
    { weight: 5, quantity: 1 },
    { weight: 2.5, quantity: 1 }
  ];

  return PAIRS;
}

// let allResults = [];
for (let i = BAR + 5; i <= 405; i += 5) {
  const res = calculate(pairs(), BAR, i);
  console.log(`${i}: `, res);
}

const localState = {
  options: [
    {
      id: 1,
      weight: 45,
      quantity: 1,
      display: "45 lb"
    },
    {
      id: 2,
      weight: 35,
      quantity: 1,
      display: "35 lb"
    },
    {
      id: 3,
      weight: 25,
      quantity: 1,
      display: "25 lb"
    },
    {
      id: 4,
      weight: 15,
      quantity: 1,
      display: "15 lb"
    },
    {
      id: 5,
      weight: 10,
      quantity: 1,
      display: "10 lb"
    },
    {
      id: 6,
      weight: 5,
      quantity: 1,
      display: "5 lb"
    },
    {
      id: 7,
      weight: 2.5,
      quantity: 1,
      display: "2.5 lb"
    }
  ]
};

const localMutations = {
  increment(state, args) {
    state.options.find(x => x.id === args.id).quantity++;
  },
  decrement(state, args) {
    state.options.find(x => x.id === args.id).quantity--;
  }
};

const localActions = {
  increment(context, args) {
    context.commit("increment", args);
  },
  decrement(context, args) {
    context.commit("decrement", args);
  }
};

export default new Vuex.Store({
  state: localState,
  getters: {
    getOptionById: state => id => {
      return state.options.find(x => x.id === id);
    }
  },
  mutations: localMutations,
  actions: localActions,
  modules: {}
});

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

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {}
});

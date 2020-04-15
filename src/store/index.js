import Vue from "vue";
import Vuex from "vuex";

// import calculate from "./calculate";
import { powerSet, sums } from "./powerSet";
import defaultOptions from "./defaultOptions.js";

Vue.use(Vuex);

const localState = {
  options: defaultOptions,
  sums: []
};

const localMutations = {
  setUnits(state, args) {
    Vue.set(state.options, "units", args.units);
  },
  increment(state, args) {
    state.options.plates.find(x => x.id === args.id).quantity++;
  },
  decrement(state, args) {
    state.options.plates.find(x => x.id === args.id).quantity--;
  },
  setBarWeightLbs(state, args) {
    Vue.set(state.options, "barWeightLbs", args.barWeightLbs);
  },
  setBarWeightKilos(state, args) {
    Vue.set(state.options, "barWeightKilos", args.barWeightKilos);
  },
  setSums(state, args) {
    Vue.set(state, "sums", args.sums);
  }
};

const localActions = {
  toggleUnits(context) {
    let units = "";
    if (context.state.options.units === "lbs") {
      units = "kilos";
    } else {
      units = "lbs";
    }

    context.commit("setUnits", {
      units: units
    });

    context.dispatch("buildSuperSet");
  },
  increment(context, args) {
    context.commit("increment", args);

    context.dispatch("buildSuperSet");
  },
  decrement(context, args) {
    context.commit("decrement", args);

    context.dispatch("buildSuperSet");
  },
  setBarWeightLbs(context, args) {
    context.commit("setBarWeightLbs", args);

    context.dispatch("buildSuperSet");
  },
  setBarWeightKilos(context, args) {
    context.commit("setBarWeightKilos", args);

    context.dispatch("buildSuperSet");
  },
  buildSuperSet(context) {
    const build = inventory => {
      let set = [];
      inventory.forEach(x => {
        for (let i = 1; i <= x.quantity; i++) {
          set.push(x.weight);
        }
      });
      return set;
    };

    const initial = context.state.options.plates.filter(
      x => x.units === context.state.options.units
    );
    const list = build(initial);
    const set = powerSet(list);
    const sum = sums(
      set,
      context.state.options.units === "lbs"
        ? context.state.options.barWeightLbs
        : context.state.options.barWeightKilos
    );

    context.commit("setSums", {
      sums: sum
    });
  }
};

export default new Vuex.Store({
  state: localState,
  getters: {
    dupes: state => {
      return state.sums.filter(x => x.hash === "290.4738");
    },
    getPlatesForUnits: state => {
      return state.options.plates.filter(x => x.units === state.options.units);
    },
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

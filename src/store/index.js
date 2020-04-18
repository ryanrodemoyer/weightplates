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
  setBarWeight(state, args) {
    Vue.set(state.options, "barWeight", args.barWeight);
  },
  setSums(state, args) {
    Vue.set(state, "sums", args.sums);
  }
};

const localActions = {
  toggleUnits(context) {
    let newUnits = "";
    if (context.state.options.units === "lbs") {
      newUnits = "kilos";
    } else {
      newUnits = "lbs";
    }

    const bwi = parseInt(context.state.options.barWeight);
    let newBarWeight = bwi;

    if (newUnits === "kilos") {
      switch (bwi) {
        case 45:
          newBarWeight = 20;
          break;
        case 35:
          newBarWeight = 15;
          break;
      }
    } else {
      switch (bwi) {
        case 20:
          newBarWeight = 45;
          break;
        case 15:
          newBarWeight = 35;
          break;
      }
    }

    context.commit("setUnits", {
      units: newUnits
    });

    context.commit("setBarWeight", { barWeight: newBarWeight });

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
  setBarWeight(context, args) {
    context.commit("setBarWeight", args);

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
    const sum = sums(set, context.state.options.barWeight);

    context.commit("setSums", {
      sums: sum
    });
  }
};

const modBarBuilder = {
  namespaced: true,
  state: {
    options: {
      barWeight: 45,
      units: "lbs",
      groupNames: ["lbs", "kilos"],
      groups: [
        {
          name: "lbs",
          plates: [55, 45, 35, 25, 15, 10, 5, 2.5, 1]
        },
        { name: "kilos", plates: [25, 20, 15, 10, 5, 2.5, 2, 1.5, 1, 0.5] }
      ]
    }
  },
  mutations: {
    setBarWeight(state, args) {
      Vue.set(state.options, "barWeight", parseInt(args.barWeight));
    },
    setUnits(state, args) {
      Vue.set(state.options, "units", args.units);
    }
  },
  actions: {
    setBarWeight(context, args) {
      context.commit("setBarWeight", args);
    },
    toggleUnits(context) {
      let newUnits = "";
      if (context.state.options.units === "lbs") {
        newUnits = "kilos";
      } else {
        newUnits = "lbs";
      }

      const bwi = parseInt(context.state.options.barWeight);
      let newBarWeight = bwi;

      if (newUnits === "kilos") {
        switch (bwi) {
          case 45:
            newBarWeight = 20;
            break;
          case 35:
            newBarWeight = 15;
            break;
        }
      } else {
        switch (bwi) {
          case 20:
            newBarWeight = 45;
            break;
          case 15:
            newBarWeight = 35;
            break;
        }
      }

      context.commit("setUnits", {
        units: newUnits
      });

      context.commit("setBarWeight", { barWeight: newBarWeight });
    }
  },
  getters: {
    getWeightsForUnits: state => {
      return state.options.groups.find(x => x.name === state.options.units)
        .plates;
    }
  }
};

export default new Vuex.Store({
  state: localState,
  getters: {
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
  modules: { modBarBuilder: modBarBuilder }
});

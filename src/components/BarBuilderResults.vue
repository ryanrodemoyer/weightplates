<template>
  <div class="card">
    <div class="card-header">
      Bar Builder
      <button class="float-right" @click="toggleUnits()">
        Show me {{ modBarBuilder.options.units === "lbs" ? "Kilos" : "Lbs" }}
      </button>
    </div>
    <div class="card-body">
      <div class="row center">
        <div class="col">
          <small>{{ this.modBarBuilder.options.units }}</small>
          <p style="font-size: 3em">{{ this.processActions }}</p>
        </div>
      </div>
      <div class="row">
        <div class="table-responsive">
          <table class="table">
            <tr>
              <td class="center" v-for="(cell, i) in buildCells" :key="i">
                <span v-bind:class="{ white: cell.weight === -1 }">{{
                  cell.weight
                }}</span>
                <p v-if="cell.isBar"><small>bar</small></p>
              </td>
            </tr>
          </table>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <button class="btn btn-lightblue btn-block" @click="reset()">
            reset
          </button>
        </div>
      </div>
      <p>&nbsp;</p>
      <BarBuilderBar />
      <p>&nbsp;</p>
      <div class="row center">
        <div class="col-4">
          + left
        </div>

        <div class="col-4">
          + pair
        </div>

        <div class="col-4">
          + right
        </div>
      </div>
      <ul class="list-group list-group-flush">
        <li
          class="list-group-item"
          v-for="(weight, i) in getWeightsForUnits"
          :key="i"
        >
          <div class="row">
            <div class="col-4">
              <button
                class="btn btn-block btn-lavender"
                @click="add({ which: 'left', weight: weight, position: i + 1 })"
              >
                {{ weight }}
              </button>
            </div>

            <div class="col-4">
              <button
                class="btn btn-block btn-purple"
                @click="add({ which: 'pair', weight: weight, position: i + 1 })"
              >
                {{ weight }}
              </button>
            </div>

            <div class="col-4">
              <button
                class="btn btn-block btn-lavender"
                @click="
                  add({ which: 'right', weight: weight, position: i + 1 })
                "
              >
                {{ weight }}
              </button>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import BarBuilderBar from "@/components/BarBuilderBar.vue";

export default {
  name: "BarBuilderResults",
  components: { BarBuilderBar },
  props: {},
  data: function() {
    return {
      ui: {
        barWeights: [],
        stepCount: 1,
        isMobile: true,
        innerWidth: -1,
        actions: []
      }
    };
  },
  computed: {
    ...mapState(["modBarBuilder"], {
      options: state => state.options
    }),
    ...mapGetters("modBarBuilder", ["getWeightsForUnits"]),
    barWeight: {
      set(val) {
        this.$store.dispatch("modBarBuilder/setBarWeight", { barWeight: val });
      },
      get() {
        return this.modBarBuilder.options.barWeight;
      }
    },
    processActions: function() {
      let total = parseInt(this.modBarBuilder.options.barWeight);

      this.ui.actions.forEach(x => {
        switch (x.which) {
          case "pair":
            total += x.weight * 2;
            break;
          default:
            total += x.weight;
            break;
        }
      });

      return total;
    },
    buildCells: function() {
      let left = [];
      let right = [];

      this.ui.actions.forEach(x => {
        switch (x.which) {
          case "pair":
            left.push({ weight: x.weight, position: x.position });
            right.push({ weight: x.weight, position: x.position });
            break;
          case "left":
            left.push({ weight: x.weight, position: x.position });
            break;
          case "right":
            right.push({ weight: x.weight, position: x.position });
            break;
        }
      });

      let cells = [];
      if (right.length > left.length) {
        for (let i = 0; i < right.length - left.length; i++) {
          cells.push({
            weight: -1,
            isBar: false
          });
        }
      }
      left.reverse().forEach(x =>
        cells.push({
          weight: x.weight,
          isBar: false,
          position: x.position
        })
      );
      cells.push({
        weight: this.modBarBuilder.options.barWeight,
        isBar: true,
        position: -1
      });
      right.forEach(x =>
        cells.push({
          weight: x.weight,
          isBar: false,
          position: x.position
        })
      );
      if (left.length > right.length) {
        for (let i = 0; i < left.length - right.length; i++) {
          cells.push({
            weight: -1,
            isBar: false
          });
        }
      }

      // cells.forEach(x => {
      //   const ems = 4 / x.position;
      //   x["style"] = {
      //     "font-size": x.isBar ? 1 : ems + "em"
      //   };
      // });
      return cells;
    }
  },
  getters: {},
  methods: {
    toggleUnits() {
      this.$store.dispatch("modBarBuilder/toggleUnits");
    },
    add(args) {
      this.ui.actions.push(args);
    },
    onResize() {
      this.ui.innerWidth = window.innerWidth;
      this.ui.isMobile = window.innerWidth < 600;
    },
    reset() {
      this.ui.actions = [];
    }
  },
  beforeDestroy() {
    if (typeof window !== "undefined") {
      window.removeEventListener("resize", this.onResize, { passive: true });
    }
  },
  mounted() {
    this.onResize();
    window.addEventListener("resize", this.onResize, { passive: true });
  }
};
</script>

<style scoped lang="scss">
.white {
  color: #ffffff;
}
</style>

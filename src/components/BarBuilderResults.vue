<template>
  <div class="card">
    <div class="card-header">
      Results
      <button class="float-right" @click="toggleUnits()">
        Show me {{ options.units === "lbs" ? "Kilos" : "Lbs" }}
      </button>
    </div>
    <div class="card-body">
      <div class="row center">
        <div class="col">
          <small>{{ this.options.units }}</small>
          <p style="font-size: 3em">{{ this.processActions }}</p>
        </div>
      </div>
      <div class="row">
        <div class="table-responsive">
          <table class="table">
            <tr>
              <!-- <td class="center">{{ this.options.barWeight }}</td> -->
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
          v-for="plate in platesFiltered"
          :key="plate.weight"
        >
          <div class="row">
            <div class="col-4">
              <button
                class="btn btn-block btn-lavender"
                @click="add({ which: 'left', weight: plate.weight })"
              >
                {{ plate.weight }}
              </button>
            </div>

            <div class="col-4">
              <button
                class="btn btn-block btn-purple"
                @click="add({ which: 'pair', weight: plate.weight })"
              >
                {{ plate.weight }}
              </button>
            </div>

            <div class="col-4">
              <button
                class="btn btn-block btn-lavender"
                @click="add({ which: 'right', weight: plate.weight })"
              >
                {{ plate.weight }}
              </button>
            </div>
          </div>
        </li>
      </ul>

      <!-- <div class="card">
            <div class="card-header">Debug</div>

            <strong>$data</strong>
            <pre style="margin: 1em;">{{ $data }}</pre>

            <strong>result (computed)</strong>
            <pre style="margin: 1em;">{{ result }}</pre>
          </div> -->
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  name: "BarBuilderResults",
  props: {},
  data: function() {
    return {
      ui: {
        stepCount: 1,
        isMobile: true,
        innerWidth: -1,
        actions: []
      }
    };
  },
  computed: {
    ...mapState(["options"]),
    ...mapGetters(["getPlatesForUnits"]),
    platesFiltered: function() {
      const res = this.getPlatesForUnits.filter(x => x.quantity >= 1);
      return res === undefined ? {} : res;
    },
    processActions: function() {
      let total = this.options.barWeight;

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
            left.push(x.weight);
            right.push(x.weight);
            break;
          case "left":
            left.push(x.weight);
            break;
          case "right":
            right.push(x.weight);
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
          weight: x,
          isBar: false
        })
      );
      cells.push({
        weight: this.options.barWeight,
        isBar: true
      });
      right.forEach(x =>
        cells.push({
          weight: x,
          isBar: false
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
      return cells;
    }
  },
  getters: {},
  methods: {
    toggleUnits() {
      this.$store.dispatch("toggleUnits");
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

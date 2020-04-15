<template>
  <div class="card">
    <div class="card-header">
      Results
      <button class="float-right" @click="toggleUnits()">
        Show me {{ options.units === "lbs" ? "Kilos" : "Lbs" }}
      </button>
    </div>
    <div class="card-body">
      <div class="row">
        <div class="col-6">
          <small>Choose the weight</small>

          <select class="form-control" v-model="ui.targetWeight">
            <option v-for="weight in ui.availableWeights" :key="weight.weight">
              {{ weight.weight }}</option
            >
          </select>
        </div>
        <div class="col-3">
          <small>every one unit</small>
          <button
            class="btn btn-block"
            v-bind:class="{
              'btn-success': ui.stepCount === 1,
              'btn-outline-success': ui.stepCount !== 1
            }"
            @click="setStep(1)"
          >
            1
          </button>
        </div>
        <div class="col-3">
          <small>every five units</small>
          <button
            class="btn btn-block"
            v-bind:class="{
              'btn-success': ui.stepCount === 5,
              'btn-outline-success': ui.stepCount !== 5
            }"
            @click="setStep(5)"
          >
            5
          </button>
        </div>
      </div>

      <p>&nbsp;</p>

      <p style="color: red; font-weight: bold;" v-show="result.length === 0">
        You need more plates!
      </p>
      <p>
        <small>Results</small>
      </p>

      <div class="table-responsive">
        <table class="table">
          <tr>
            <td>Plate</td>

            <td
              v-for="plate in platesFiltered"
              :key="plate.weight"
              class="center"
            >
              {{ plate.weight }}
            </td>
            <td class="center" v-if="ui.showHash">Hash</td>
            <td class="center">Total</td>
          </tr>
          <tr v-for="(res, id) in result" :key="id">
            <td>
              <span v-if="id === 0">Quantity <small>(pairs)</small></span>
            </td>
            <td
              v-for="plate in platesFiltered"
              :key="plate.weight"
              v-bind:class="{
                highlight: res.items.find(r => r === plate.weight)
              }"
              class="center"
            >
              {{ res.items.filter(r => r === plate.weight).length }}
            </td>
            <td class="center" v-if="ui.showHash">{{ res["hash"] }}</td>
            <td class="center">{{ res["sum"] }}</td>
          </tr>
        </table>
      </div>

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
  name: "Combinations",
  props: {},
  data: function() {
    return {
      ui: {
        targetWeight: 145,
        availableWeights: [],
        showHash: false,
        stepCount: 1
      }
    };
  },
  computed: {
    ...mapState(["options", "sums"]),
    ...mapGetters(["getResultByWeight", "getPlatesForUnits"]),
    result: function() {
      const res = this.sums.filter(
        x => x.sum === parseInt(this.ui.targetWeight)
      );
      return res === undefined ? { items: [], sum: 0 } : res;
    },
    platesFiltered: function() {
      const res = this.getPlatesForUnits.filter(x => x.quantity >= 1);
      return res === undefined ? {} : res;
    }
  },
  getters: {},
  methods: {
    toggleUnits() {
      this.$store.dispatch("toggleUnits");
    },
    setStep(value) {
      const step = value || this.ui.stepCount;

      this.ui.stepCount = step;

      this.ui.availableWeights = [];

      for (let i = 15; i <= 675; i += step) {
        this.ui.availableWeights.push({
          weight: i
        });
      }
    }
  },
  mounted() {
    this.setStep(1);
  }
};
</script>

<style scoped lang="scss">
.highlight {
  background-color: lavender;
}

.center {
  text-align: center;
}
</style>

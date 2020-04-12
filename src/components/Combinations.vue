<template>
  <div class="card">
    <div class="card-header">Results</div>
    <div class="card-body">
      <small>Choose the weight</small>

      <select class="form-control" v-model="ui.targetWeight">
        <option
          v-for="weight in availableWeights"
          :key="weight.weight"
          :selected="weight.weight === 180"
          :disabled="weight.isDisabled === true"
        >
          {{ weight.weight }}</option
        >
      </select>

      <p>&nbsp;</p>

      <p
        style="color: red; font-weight: bold;"
        v-show="result['isSuccess'] === false"
      >
        You are short
        {{ parseInt(ui.targetWeight) - result["totalWeight"] }} lbs. You need
        more plates!
      </p>
      <p>
        <small>Results</small>
      </p>

      <div class="table-responsive">
        <table class="table">
          <tr>
            <td>Plate</td>
            <td v-bind:class="{ highlight: result['2.5'] !== 0 }">2.5</td>
            <td v-bind:class="{ highlight: result['5'] !== 0 }">5</td>
            <td v-bind:class="{ highlight: result['10'] !== 0 }">10</td>
            <td v-bind:class="{ highlight: result['15'] !== 0 }">15</td>
            <td v-bind:class="{ highlight: result['25'] !== 0 }">25</td>
            <td v-bind:class="{ highlight: result['35'] !== 0 }">35</td>
            <td v-bind:class="{ highlight: result['45'] !== 0 }">45</td>
            <td>Total</td>
          </tr>
          <tr>
            <td>Quantity <small>(pairs)</small></td>
            <td v-bind:class="{ highlight: result['2.5'] !== 0 }">
              {{ result["2.5"] }}
            </td>
            <td v-bind:class="{ highlight: result['5'] !== 0 }">
              {{ result["5"] }}
            </td>
            <td v-bind:class="{ highlight: result['10'] !== 0 }">
              {{ result["10"] }}
            </td>
            <td v-bind:class="{ highlight: result['15'] !== 0 }">
              {{ result["15"] }}
            </td>
            <td v-bind:class="{ highlight: result['25'] !== 0 }">
              {{ result["25"] }}
            </td>
            <td v-bind:class="{ highlight: result['35'] !== 0 }">
              {{ result["35"] }}
            </td>
            <td v-bind:class="{ highlight: result['45'] !== 0 }">
              {{ result["45"] }}
            </td>
            <td>{{ result["totalWeight"] }}</td>
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
      ui: { targetWeight: 225 }
    };
  },
  computed: {
    ...mapState(["availableWeights", "calculatedResults"]),
    ...mapGetters(["getResultByWeight"]),
    result: function() {
      return this.calculatedResults.find(
        x => x.weight === parseInt(this.ui.targetWeight)
      );
    }
  },
  getters: {},
  methods: {}
};
</script>

<style scoped lang="scss">
.highlight {
  background-color: lavender;
}
</style>

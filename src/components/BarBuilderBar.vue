<template>
  <div class="row">
    <div class="col-3" style="margin: auto;">
      <strong>Bar</strong>
    </div>
    <div class="col-9">
      <select class="form-control" v-model="barWeight">
        <option v-for="i in ui.barWeights" :key="i">{{ i }}</option>
      </select>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  name: "BarBuilderBar",
  components: {},
  props: {},
  data: function() {
    return {
      ui: {
        barWeights: []
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
    }
  },
  methods: {},
  mounted: function() {
    for (let i = 1; i <= 100; i++) {
      this.ui.barWeights.push(i);
    }
  },
  created: function() {}
};
</script>

<style scoped lang="scss"></style>

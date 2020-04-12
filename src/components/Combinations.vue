<template>
  <div class="row">
    <div class="col-sm">
      <div class="card">
        <div class="card-header">Results</div>
        <div class="card-body">results here</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  name: "Combinations",
  props: {},
  data: function() {
    return {};
  },
  computed: {
    ...mapState(["options"]),
    ...mapGetters(["getOptionById"])
  },
  getters: {},
  methods: {
    increment: function() {
      console.log("inc");
    },
    decrement: function() {
      console.log("dec");
    }
  }
};
</script>

<style scoped lang="scss"></style>

<template>
  <div class="container-fluid">
    <div class="center">
      <h1>Bar Builder</h1>
    </div>

    <div class="row">
      <div class="col-sm">
        <BarBuilderOptions />
      </div>
    </div>

    <p>&nbsp;</p>

    <div class="row">
      <div class="col-sm">
        <BarBuilderResults />
      </div>
    </div>

    <p>&nbsp;</p>

    <!-- <div class="row">
      <div class="col-sm">
        <div class="card">
          <div class="card-header">Debug</div>
          <pre style="margin: 1em;">{{ $data }}</pre>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script>
import { mapState } from "vuex";
import BarBuilderResults from "@/components/BarBuilderResults.vue";
import BarBuilderOptions from "@/components/BarBuilderOptions.vue";

export default {
  name: "BarBuilder",
  components: {
    BarBuilderOptions,
    BarBuilderResults
  },
  props: {},
  data: function() {
    return {};
  },
  computed: {
    ...mapState([])
  },
  methods: {
    toggle: function() {
      this.ui.showOptions = !this.ui.showOptions;
    }
  },
  created: function() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
</style>

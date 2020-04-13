<template>
  <div class="container-fluid">
    <div class="center">
      <h1>Weight Plates</h1>
    </div>

    <div class="row">
      <div class="col-sm">
        <Options />
      </div>
    </div>

    <p>&nbsp;</p>

    <div class="row">
      <div class="col-sm">
        <Combinations />
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
import Options from "@/components/Options.vue";
import Combinations from "@/components/Combinations.vue";
import { mapState } from "vuex";

export default {
  name: "WeightPlates",
  components: {
    Options,
    Combinations
  },
  props: {},
  data: function() {
    return {};
  },
  computed: {
    ...mapState(["options"])
  },
  methods: {
    toggle: function() {
      this.ui.showOptions = !this.ui.showOptions;
    }
  }
  // created: function() {
  //   this.$store.dispatch("calculate");
  // }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.center {
  text-align: center;
}
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
a {
  color: #42b983;
}
</style>

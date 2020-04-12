<template>
  <div class="container-fluid">
    <div class="center">
      <h1>{{ msg }}</h1>
    </div>

    <div class="row">
      <div class="col-sm">
        <div class="card">
          <div class="card-header">
            Available Plates (pairs)

            <span class="float-right">
              <button @click="toggle()">
                {{ ui.showOptions ? "Hide" : "Show" }}
              </button>
            </span>
          </div>

          <div id="options" v-show="ui.showOptions">
            <ul class="list-group list-group-flush">
              <OptionRow
                v-for="option in options"
                :key="option.id"
                v-bind:id="option.id"
              />
            </ul>
          </div>
        </div>
      </div>
    </div>

    <p>&nbsp;</p>

    <Combinations />

    <p>&nbsp;</p>

    <div class="row">
      <div class="col-sm">
        <div class="card">
          <div class="card-header">Debug</div>

          <pre style="margin: 1em;">{{ $data }}</pre>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import OptionRow from "@/components/OptionRow.vue";
import Combinations from "@/components/Combinations.vue";
import { mapState } from "vuex";

export default {
  name: "WeightPlates",
  components: {
    OptionRow,
    Combinations
  },
  props: {
    msg: String
  },
  data: function() {
    return {
      ui: {
        showOptions: true
      }
    };
  },
  computed: {
    ...mapState(["options"])
  },
  methods: {
    toggle: function() {
      this.ui.showOptions = !this.ui.showOptions;
    }
  }
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

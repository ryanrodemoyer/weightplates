<template>
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
          v-for="plate in getPlatesForUnits"
          :key="plate.id"
          v-bind:id="plate.id"
        />
        <li class="list-group-item">
          <div class="row">
            <div class="col-3" style="margin: auto;">
              <strong>Bar</strong>
            </div>
            <div class="col-6 offset-3">
              <select class="form-control" v-model="barWeight">
                <option v-for="i in ui.barWeights" :key="i">{{ i }}</option>
              </select>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import OptionRow from "@/components/OptionRow.vue";
import { mapState, mapGetters } from "vuex";

export default {
  name: "WeightPlates",
  components: {
    OptionRow
  },
  props: {},
  data: function() {
    return {
      ui: {
        showOptions: false,
        barWeights: []
      }
    };
  },
  computed: {
    ...mapState(["options"]),
    ...mapGetters(["getPlatesForUnits"]),
    barWeight: {
      set(val) {
        this.$store.dispatch("setBarWeight", { barWeight: val });
      },
      get() {
        return this.options.barWeight;
      }
    }
  },
  methods: {
    toggle: function() {
      this.ui.showOptions = !this.ui.showOptions;
    }
  },
  mounted: function() {
    for (let i = 1; i <= 100; i++) {
      this.ui.barWeights.push(i);
    }
  },
  created: function() {
    this.$store.dispatch("buildSuperSet");
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

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
          v-for="plate in options.plates"
          :key="plate.id"
          v-bind:id="plate.id"
        />
        <li class="list-group-item">
          <div class="row">
            <div class="col-3" style="margin: auto;">
              <strong>Bar</strong>
            </div>
            <div class="col-9">
              <div class="form-check-inline">
                <label class="form-check-label">
                  <input
                    type="radio"
                    class="form-check-input"
                    name="barweight"
                    value="45"
                    v-model="ui.barWeight"
                  />45
                </label>
              </div>
              <div class="form-check-inline">
                <label class="form-check-label">
                  <input
                    type="radio"
                    class="form-check-input"
                    name="barweight"
                    value="35"
                    v-model="ui.barWeight"
                  />35
                </label>
              </div>
              <!--               
              <select class="form-control">
                <option selected>45</option>
                <option>35</option>
              </select> -->
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import OptionRow from "@/components/OptionRow.vue";
import { mapState } from "vuex";

export default {
  name: "WeightPlates",
  components: {
    OptionRow
  },
  props: {},
  data: function() {
    return {
      ui: {
        showOptions: true,
        barWeight: 0
      }
    };
  },
  // watch: {
  //   "ui.barWeight": function(val) {
  //     console.log(val);
  //     this.$store.dispatch("setBarWeight", parseInt(val));
  //   }
  // },
  computed: {
    ...mapState(["options"])
  },
  methods: {
    toggle: function() {
      this.ui.showOptions = !this.ui.showOptions;
    }
  },
  created: function() {
    this.ui.barWeight = this.options.barWeight;
    this.$store.dispatch("calculate");
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

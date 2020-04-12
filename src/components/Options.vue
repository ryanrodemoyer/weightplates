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
          v-for="option in options"
          :key="option.id"
          v-bind:id="option.id"
        />
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
  },
  created: function() {
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

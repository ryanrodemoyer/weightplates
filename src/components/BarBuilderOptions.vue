<template>
  <div class="card">
    <div class="card-header">
      Options

      <span class="float-right">
        <button @click="toggle()">
          {{ ui.showOptions ? "Hide" : "Show" }}
        </button>
      </span>
    </div>

    <div class="card-body" v-show="ui.showOptions">
      <div class="row">
        <div class="col-3" style="margin: auto;">
          <strong>Units</strong>
        </div>
        <div class="col-9">
          <select class="form-control" v-model="units">
            <option
              v-for="name in modBarBuilder.options.groupNames"
              :key="name"
              >{{ name }}</option
            >
          </select>
        </div>
      </div>
      <p>&nbsp;</p>
      <BarBuilderBar />
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import BarBuilderBar from "@/components/BarBuilderBar.vue";

export default {
  name: "BarBuilderOptions",
  components: { BarBuilderBar },
  props: {},
  data: function() {
    return {
      ui: {
        showOptions: false
      }
    };
  },
  computed: {
    ...mapState(["modBarBuilder"], {
      options: state => state.options
    }),
    // ...mapGetters(),
    units: {
      set(val) {
        this.$store.dispatch("modBarBuilder/toggleUnits", { units: val });
      },
      get() {
        return this.modBarBuilder.options.units;
      }
    }
  },
  methods: {
    toggle: function() {
      this.ui.showOptions = !this.ui.showOptions;
    }
  },
  mounted: function() {},
  created: function() {}
};
</script>

<style scoped lang="scss">
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

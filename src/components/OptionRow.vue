<template>
  <li class="list-group-item">
    <div class="row">
      <div class="col-3" style="margin: auto;">
        <strong>{{ getOptionById(this.id).display }}</strong>
      </div>
      <div class="col-3" style="margin: auto;">
        <span>{{ getOptionById(this.id).quantity }}</span>
      </div>
      <div class="col-3">
        <button class="btn btn-lavender btn-block" @click="increment()">
          inc
        </button>
      </div>
      <div class="col-3">
        <button
          class="btn btn-lightblue btn-block"
          @click="decrement()"
          :disabled="getOptionById(this.id).quantity === 0"
        >
          dec
        </button>
      </div>
    </div>
  </li>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  name: "OptionRow",
  props: {
    id: Number
  },
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
      this.$store.dispatch("increment", {
        id: this.id
      });
    },
    decrement: function() {
      this.$store.dispatch("decrement", {
        id: this.id
      });
    }
  }
};
</script>

<style scoped lang="scss">
$darkamount: 2;
$darklavender: darken(
  $color: lavender,
  $amount: $darkamount
);
$darklightblue: darken(
  $color: lightblue,
  $amount: $darkamount
);

.btn-lavender {
  background-color: lavender;
  border-color: $darklavender;
}

.btn-lavender:hover {
  background-color: $darklavender;
  border-color: $darklavender;
}

.btn-lightblue {
  background-color: lightblue;
  border-color: $darklightblue;
}

.btn-lightblue:hover {
  background-color: $darklightblue;
  border-color: $darklightblue;
}
</style>

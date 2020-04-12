<template>
  <li class="list-group-item">
    <div class="row">
      <div class="col-3" style="margin: auto;">
        <strong>5 lb</strong>
      </div>
      <div class="col-3" style="margin: auto;">
        <span>{{ options.two_point_five }}</span>
      </div>
      <div class="col-3">
        <button class="btn btn-info btn-block">inc</button>
      </div>
      <div class="col-3">
        <button class="btn btn-warning btn-block">dec</button>
      </div>
    </div>
  </li>
</template>

<script>
export default {
  name: "OptionRow",
  props: {
    key: String
  },
  data: function() {
    return {};
  },
  methods: {}
};
</script>

<style scoped lang="scss"></style>

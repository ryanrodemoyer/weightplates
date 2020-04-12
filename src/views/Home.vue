<template>
  <div class="home">
    <WeightPlates msg="Weight Plates" />
  </div>
</template>

<script>
// @ is an alias to /src
import WeightPlates from "@/components/WeightPlates.vue";

export default {
  name: "Home",
  components: {
    WeightPlates
  }
};
</script>

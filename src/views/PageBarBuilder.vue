<template>
  <div class="home">
    <BarBuilder />
  </div>
</template>

<script>
// @ is an alias to /src
import BarBuilder from "@/components/BarBuilder.vue";

export default {
  name: "PageBarBuilder",
  components: {
    BarBuilder
  }
};
</script>





<template>
  <div>
    xxx
    {{msg}}
    <p>23424</p>
    <base-son></base-son>
  </div>
</template>

<script>
import son from "./Son";

export default {
  components: {
    "base-son": son,
  },
  data() {
    return {
      msg: "hello vue",
    };
  },
};
</script>

<style>
div {
  background-color: red;
}
</style>
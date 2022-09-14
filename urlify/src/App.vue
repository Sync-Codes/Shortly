<template id="temp">
  <div id="app">
    <Main />
  </div>
</template>

<script>
import Main from "./components/Main.vue";

export default {
  name: "App",
  components: {
    Main,
  },
  data() {
    return {
      // color: "#FA1C41",
    };
  },
};
</script>

<style>

html {
  background: rgb(248, 234, 111)
}

</style>

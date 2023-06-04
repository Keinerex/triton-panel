<template>
    <Layout>
      <router-view></router-view>
    </Layout>
</template>

<script>
import Layout from "@/components/Layout.vue";

export default {
  components: {
    Layout
  }
}
</script>

<style lang="scss">
*{
  margin: 0;
  padding: 0;
}
body{
  background: $bg-color;
  width: 100vw;
  height: 100vh;
}
#app{
  width: 100%;
  height: calc(100% - $header-height);
}
</style>

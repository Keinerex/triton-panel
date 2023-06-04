<template>
  <main class="main">
    <model-list />
    <version-list />
    <panel />
  </main>
</template>

<script>
import ModelList from "@/components/ModelList.vue";
import VersionList from "@/components/VersionList.vue";
import Panel from "@/components/Panel.vue";

export default {
  components: {VersionList, ModelList, Panel}

}
</script>

<style scoped lang="scss">
.main{
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 2fr;
}
</style>
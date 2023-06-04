<template>
  <section v-if="this.$route.params.versionId" class="section">
    <h1>{{ model?.name }} {{ version?.name }}</h1>
  </section>
</template>

<script>
import {useVersionStore} from "@/stores/versions";
import {useModelStore} from "@/stores/models";

export default {
  data() {
    return {
      useVersion: useVersionStore(),
      useModel: useModelStore(),
    }
  },
  computed: {
    modelId() {
      return this.$route.params.modelId
    },
    versionId() {
      return this.$route.params.versionId
    },
    model() {
      return this.useModel.model(this.modelId)
    },
    version() {
      return this.useVersion.version(this.modelId, this.versionId)
    }
  }
}
</script>

<style scoped lang="scss">
.section {
  width: calc(100% - 80px);
  height: calc(100% - 40px);
  box-sizing: border-box;
  margin: 20px 40px;
  padding: 20px;
  background: $secondary-color;
  border-radius: 20px;
}
</style>
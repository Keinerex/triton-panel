<template>
  <section class="versions">
    <version-card
        v-for="version in useVersion.versions(modelId)"
        :modelId="modelId"
        :is-loaded="version.triton_loaded"
        :name="version.name"
        :version-id="version.id"
        @deleteVersion="updateVersions"
        @deleteModel="updateModels"
    />
  </section>
</template>

<script>
import {useVersionStore} from "@/stores/versions";
import {useModelStore} from "@/stores/models";
import VersionCard from "@/components/VersionCard.vue";


export default {
  components: {VersionCard},
  data() {
    return {
      useVersion: useVersionStore(),
      useModel: useModelStore(),
    }
  },
  computed: {
    modelId() {
      return this.$route.params.modelId
    }
  },
  methods: {
    updateVersions(modelId) {
      this.useVersion.loadModels(modelId, true)
    },
    updateModels() {
      console.log("Model")
      this.useModel.loadModels(true)
    }
  }
}
</script>

<style scoped lang="scss">
.versions {
  padding-top: 20px;
  height: 100%;
  max-height: 100%;
  overflow: auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 20px;
  color: $main-color;
  -webkit-text-fill-color: black;

  &::-webkit-scrollbar,
  &::-webkit-scrollbar-thumb {
    width: 26px;
    border-radius: 13px;
    background-clip: padding-box;
    border: 10px solid transparent;
  }

  &::-webkit-scrollbar-thumb {
    box-shadow: inset 0 0 0 10px;
  }
}
</style>
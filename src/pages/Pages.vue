<template>
  <ModelsPage v-if="userStore.status" />
  <LoginPage v-else />
</template>

<script>
import {useUserStore} from "@/stores/user";
import ModelsPage from "@/pages/ModelsPage.vue";
import LoginPage from "@/pages/LoginPage.vue";
import cloud from "@/icons/cloud.svg"

export default {
  components: {ModelsPage, LoginPage},
  data() {
    return {
      userStore: useUserStore()
    }
  }
}
</script>
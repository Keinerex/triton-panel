<template>
  <Header>

  </Header>
  <slot></slot>
  <Toast />
</template>

<script>
import Header from "@/components/Header.vue"

export default {
  components: {
    Header,
  }
}
</script>
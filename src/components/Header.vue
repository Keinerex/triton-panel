<template>
  <header class="header">
    <h2>Панель управления Triton</h2>
  </header>
</template>

<script>
export default {}
</script>
<style scoped lang="scss">
.header {
  background: $secondary-color;
  color: $main-color;

  font-family: "Open Sans", sans-serif;
  font-weight: 700;

  width: 100%;
  height: $header-height;

  display: flex;
  justify-content: flex-start;
  align-items: center;

  padding: 0 40px;
  box-sizing: border-box;
}
</style>

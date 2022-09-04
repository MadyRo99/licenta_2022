<template>
  <div id="app">
    <Header />
    <router-view></router-view>
  </div>
</template>

<script>
import Header from "./components/partials/Header"

export default {
  name: 'App',
  components: {
    Header
  }
}
</script>

<style scoped></style>

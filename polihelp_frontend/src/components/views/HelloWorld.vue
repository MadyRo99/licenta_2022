<template>
  <div class="HelloWorld">
    <p>Hello | <router-link to="/login">Login</router-link></p>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  created() {
    console.log("home")
  }
}
</script>

<style scoped></style>

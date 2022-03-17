<template>
  <div id="header">
    <p><router-link to="/">Home</router-link> | <router-link to="/login">Login</router-link> | <router-link to="/register">Register</router-link> | <router-link :to="{ path: '/profile/' + this.$store.state.auth.user.id}">Profile</router-link> | <router-link to="/logout">Logout</router-link></p>
  </div>
</template>

<script>
export default {
  name: 'Header'
}
</script>

<style scoped></style>
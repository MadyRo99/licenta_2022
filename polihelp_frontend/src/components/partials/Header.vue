<template>
  <div id="header">
    <p><router-link to="/">Home</router-link> <span v-if="!$store.state.auth.user">|</span> <router-link v-if="!$store.state.auth.user" to="/login">Login</router-link> <span v-if="!$store.state.auth.user">|</span> <router-link v-if="!$store.state.auth.user" to="/register">Register</router-link> <span v-if="$store.state.auth.user">|</span> <router-link v-if="$store.state.auth.user" :to="{ path: '/profile/' + profileRouteUserId }">Profile</router-link> <span v-if="$store.state.auth.user">|</span> <router-link v-if="$store.state.auth.user" :to="{ path: '/addEvent' }">Adauga Eveniment</router-link> <span v-if="$store.state.auth.user">|</span> <router-link v-if="$store.state.auth.user" to="/logout">Logout</router-link></p>
  </div>
</template>

<script>
export default {
  name: 'Header',
  computed: {
    profileRouteUserId: function() {
        return this.$store.state.auth.user ? this.$store.state.auth.user.id : ""
    }
  }
}
</script>

<style scoped></style>
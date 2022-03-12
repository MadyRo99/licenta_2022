<template>
  <div class="DisplayPosts">
    <Post></Post>
    <Post></Post>
  </div>
</template>

<script>
import Post from "../Post";

export default {
  name: 'DisplayPosts',
  components: { Post },
  data() {
    return {
      data: ""
    }
  },
  computed: {
  },
  methods: {
  }
}
</script>

<style scoped></style>

<template>
  <div class="NewsFeed">
    <AddPost></AddPost>
    <br>
    <DisplayPosts></DisplayPosts>
  </div>
</template>

<script>
import AddPost from "../utils/AddPost";
import DisplayPosts from "../utils/DisplayPosts";

export default {
  name: 'NewsFeed',
  components: { AddPost, DisplayPosts },
  props: {
    msg: String
  },
  created() {
    //
  }
}
</script>

<style scoped></style>

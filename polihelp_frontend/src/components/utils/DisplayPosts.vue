<template>
  <div class="DisplayPosts">

    <div class="container" id="app">

      <div class="list-group-wrapper">
        <transition name="fade">
          <div class="loading" v-show="loading">
            <span class="fa fa-spinner fa-spin"></span> Se incarca...
          </div>
        </transition>
        <ul class="list-group" id="infinite-list">
          <Post v-for="post in posts" :key="post.id" :postData="{...post, postLikes: post.userLikes.length}" :postUserData="{lastName: post.lastName, firstName: post.firstName, displayRole: post.roleId, facultyName: post.facultyId, year: post.year}" :userLikes="post.userLikes" @post-deleted="removePostFromList"></Post>
        </ul>
      </div>

    </div>
  </div>
</template>

<script>
import Post from "../Post";
import PostsService from "../../services/PostsService";

export default {
  name: 'DisplayPosts',
  components: { Post },
  data() {
    return {
      loading: false,
      offset: 0,
      posts: []
    }
  },
  watch: {
    '$route.params': {
      handler() {
        this.posts = []
        this.initializeComponent()
      },
      immediate: true,
    }
  },
  mounted () {
    const listElm = document.querySelector('#infinite-list');
    // eslint-disable-next-line no-unused-vars
    listElm.addEventListener('scroll', e => {
      if(listElm.scrollTop + listElm.clientHeight >= listElm.scrollHeight) {
        this.loadMore();
      }
    });

    this.loadMore();
  },
  methods: {
    initializeComponent: function () {
      //this.loadMore()
    },
    loadMore: function () {
      this.loading = true;
      PostsService.getNewsFeedPosts({offset: this.offset}).then(response => {
        console.log(response)
        this.offset += response.length
        this.loading = false
        let parsedPosts = JSON.parse(JSON.stringify(response))
        parsedPosts.forEach((post) => {
          this.posts.push(post)
        })
        //this.posts = this.posts.push(JSON.parse(JSON.stringify(response)))
      }).catch(() => {
        this.toast('b-toaster-bottom-right', "danger", "Eroare", "A aparut o eroare la incarcarea postarilor")
      })
    },
    removePostFromList(postData) {
      this.posts = this.posts.filter(function( post ) {
        return post.id !== postData.postId;
      });
    },
    toast: function (toaster, variant, title, message) {
      this.$bvToast.toast(message, {
        title: title,
        variant: variant,
        toaster: toaster,
        solid: true,
        appendToast: true,
        autoHideDelay: 3000
      })
    },
  }
}
</script>

<style scoped>

.container {
  border: 1px solid red;
  width: 100%;
}

body {
  background-color: #5c4084;
  padding: 50px;
}

.list-group {
  width: 100%;
  overflow: auto;
  height: 68vh;
  border-radius: 5px;
}

.list-group::-webkit-scrollbar { width: 0 !important }
.list-group { overflow: -moz-scrollbars-none; }
.list-group { -ms-overflow-style: none; }

.loading {
  text-align: center;
  position: absolute;
  color: #fff;
  z-index: 9;
  background: #5c4084;
  padding: 8px 18px;
  border-radius: 5px;
  left: calc(50% - 45px);
  top: calc(50% - 18px);
}

</style>
<template>
  <div class="DisplayPosts">
    <div id="app">
      <div class="list-group-wrapper">
        <transition name="fade">
          <div class="loading" v-show="loading">
            <span class="fa fa-spinner fa-spin"></span> Se incarca...
          </div>
        </transition>
        <ul class="list-group" id="infinite-list">
          <div v-for="n in (posts.length + events.length)" :key="n - 1">
            <Post v-if="posts[n - 1] != null" :postData="{...posts[n - 1], postLikes: posts[n - 1].userLikes.length}" :postUserData="{lastName: posts[n - 1].lastName, firstName: posts[n - 1].firstName, displayRoleType: posts[n - 1].roleName, facultyName: posts[n - 1].facultyName, year: posts[n - 1].year, profileImage: posts[n - 1].profileImage}" :userLikes="posts[n - 1].userLikes" @post-deleted="removePostFromList"></Post>
            <Event v-if="events[n - 1] != null" :eventData="{...events[n - 1]}" :eventUserData="{lastName: events[n - 1].lastName, firstName: events[n - 1].firstName, displayRoleType: events[n - 1].roleName, facultyName: events[n - 1].facultyName, year: events[n - 1].year, profileImage: events[n - 1].profileImage}" :userEvents="events[n - 1].userEvents" @event-deleted="removeEventFromList"></Event>
          </div>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Post from "../Post";
import Event from "../Event";
import PostsService from "../../services/PostsService";
import EventsService from "../../services/EventsService";
import UtilsService from "../../services/UtilsService";

export default {
  name: 'DisplayPosts',
  components: { Post, Event },
  data() {
    return {
      loading: false,
      postsOffset: 0,
      eventsOffset: 0,
      posts: [],
      events: [],
    }
  },
  watch: {
    '$route.params': {
      handler() {
        this.posts = []
        this.events = []
      },
      immediate: true,
    }
  },
  mounted () {
    UtilsService.getPostsAndEventsCount()

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
    loadMore: function () {
      this.loading = true;

      PostsService.getNewsFeedPosts({offset: this.postsOffset}).then(response => {
        this.postsOffset += response.length
        this.loading = false
        let parsedPosts = JSON.parse(JSON.stringify(response))
        parsedPosts.forEach((post) => {
          this.posts.push(post)
        })
      }).catch(() => {
        this.toast('b-toaster-bottom-right', "danger", "Eroare", "A aparut o eroare la incarcarea postarilor")
      })

      EventsService.getNewsFeedEvents({offset: this.eventsOffset}).then(response => {
        this.eventsOffset += response.length
        this.loading = false
        let parsedEvents = JSON.parse(JSON.stringify(response))
        parsedEvents.forEach((theEvent) => {
          this.events.push(theEvent)
        })
      }).catch(() => {
        this.toast('b-toaster-bottom-right', "danger", "Eroare", "A aparut o eroare la incarcarea evenimentelor")
      })
    },
    removePostFromList(postData) {
      this.posts = this.posts.filter(function( post ) {
        return post.id !== postData.postId;
      });
    },
    removeEventFromList(eventData) {
      this.events = this.events.filter(function( event ) {
        return event.id !== eventData.eventId;
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
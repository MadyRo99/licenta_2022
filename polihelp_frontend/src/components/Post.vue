<template>
  <div class="Post">
    <div class="post-user">
      <div class="post-user-left">
        <router-link :to="{path: '/profile/' + postData.authorId}">
          <div class="img-container-user">
            <img v-if="postUserData.profileImage" :src="postUserData.profileImage" alt="default-user.png">
            <img v-else src="https://imagini-profil.s3.eu-central-1.amazonaws.com/defaultUserImage.png" alt="default-user.png">
          </div>
        </router-link>
        <div class="post-user-info">
          <router-link :to="{path: '/profile/' + postData.authorId}">
            <h1>{{ postUserData.lastName }} {{ postUserData.firstName }}</h1>
          </router-link>
          <h2>{{ postCreatedAt }}</h2>
        </div>
        <div class="clearfix"></div>
      </div>
      <div class="post-social-info">
        <div class="post-likes">
          <h2>{{ this.postLikes }}</h2>
          <div class="img-container-like" @click="this.likePost">
            <img v-if="postLiked" src="@/assets/images/like_filled.png" alt="like.png">
            <img v-else src="@/assets/images/like.png" alt="like.png">
          </div>
        </div>
<!--        <div class="post-comments">-->
<!--          <h2>0</h2>-->
<!--          <div class="img-container-like">-->
<!--            <img src="@/assets/images/comment.png" alt="comment.png">-->
<!--          </div>-->
<!--        </div>-->
        <div class="clearfix"></div>
      </div>
      <div class="clearfix"></div>
      <div class="post-faculty">
        <h3>
          {{ postUserData.displayRoleType }} la {{ postUserData.facultyName }}
          <br>
          {{ postUserData.year }}
        </h3>
      </div>
      <hr color="#FFFFFF">
      <p>
        {{ postData.content }}
      </p>
      <button v-if="postData.authorId === this.$store.state.auth.user.id" type="button" class="btn btn-danger"
      @click="this.deletePost">Sterge Postarea</button>
    </div>
  </div>
</template>

<script>
import PostsService from "../services/PostsService";

export default {
  name: 'Post',
  props: {
    postData: Object,
    postUserData: Object,
    userLikes: Array
  },
  data() {
    return {
      postCreatedAt: "",
      postLiked: false,
      postLikes: 0,
      blockLikeButton: false
    }
  },
  created() {
    this.postLikes = this.postData.postLikes
    this.formatDate()
    this.checkIfLiked()
  },
  methods: {
    formatDate: function () {
      let date = new Date(this.postData.createdAt)
      let month
      switch (date.getMonth()) {
        case 0:
          month = 'Ianuarie'
          break
        case 1:
          month = 'Februarie'
          break
        case 2:
          month = 'Martie'
          break
        case 3:
          month = 'Aprilie'
          break
        case 4:
          month = 'Mai'
          break
        case 5:
          month = 'Iunie'
          break
        case 6:
          month = 'Iulie'
          break
        case 7:
          month = 'August'
          break
        case 8:
          month = 'Septembrie'
          break
        case 9:
          month = 'Octombrie'
          break
        case 10:
          month = 'Noiembrie'
          break
        case 11:
          month = 'Decembrie'
          break
      }

      let hours = (date.getHours().toString().length == 1) ? "0" + date.getHours() : date.getHours()
      let minutes = (date.getMinutes().toString().length == 1) ? "0" + date.getMinutes() : date.getMinutes()
      this.postCreatedAt = date.getDate() + " " + month + " " + date.getFullYear() + " la " + hours + ":" + minutes
    },
    likePost: function () {
      this.blockLikeButton = true
      PostsService.likePost({userId: this.$store.state.auth.user.id, postId: this.postData.id}).then(response => {
        if (response.success === true) {
          if (response.liked === true) {
            this.postLiked = true
            this.postLikes = parseInt(this.postLikes) + 1
          } else {
            this.postLiked = false
            this.postLikes = parseInt(this.postLikes) - 1
          }
          this.blockLikeButton = false
        }
      }).catch(() => {
        this.toast('b-toaster-bottom-right', "danger", "Eroare", "A aparut o eroare in cursul aprecierii postarii")
      })
    },
    checkIfLiked: function () {
      if (this.userLikes.some(e => ((e.postId == this.postData.id) && (e.userId == this.$store.state.auth.user.id)))) {
        this.postLiked = true
      }
    },
    deletePost: function () {
      PostsService.deletePost(this.postData.id).then(response => {
        if (response.success === true) {
          this.$emit('post-deleted', { postId: this.postData.id })
          this.toast('b-toaster-bottom-right', "success", "Succes", "Postarea a fost stearsa cu succes");
        }
      }).catch(() => {
        this.toast('b-toaster-bottom-right', "danger", "Eroare", "A aparut o eroare in cursul stergerii postarii")
      })
    },
    toast: function (toaster, variant, title, message) {
      this.$bvToast.toast(message, {
        title: title,
        variant: variant,
        toaster: toaster,
        solid: true,
        appendToast: true,
        autoHideDelay: 5000
      })
    }
  }
}
</script>

<style scoped>
.post-user {
  max-width: 1000px;
  margin: 0 auto 35px;
  padding: 25px 25px 10px;
  background: #44449B;
  border-radius: 8px;
  color: #F4F7F8;
}

.img-container-user {
  position: relative;
  float: left;
  margin-right: 10px;
  width: 75px;
  height: 75px;
}

.post-user .img-container-user img {
  position: absolute;
  border-radius: 50px;
  width: 75px;
  height: 75px;
}

.img-container-like {
  position: relative;
  cursor: pointer;
  float: left;
  margin-right: 20px;
  width: 40px;
  height: 35px;
}

.post-user .img-container-like img {
  position: absolute;
  width: 40px;
  height: 35px;
}

.post-user .post-user-info {
  margin-top: 14px;
  margin-left: 5px;
  float: left;
}

.post-user-left {
  float: left;
}

.post-social-info {
  float: right;
  margin-top: 7.5px;
}

.post-likes {
  float: left;
}

.post-comments {
  float: left;
}

.post-social-info h2 {
  font-size: 13px;
  font-weight: bold;
  margin-left: 16px;
}

.post-user .post-user-info h1 {
  font-size: 18px;
  color: #FFFFFF;
  text-decoration-color: #FFFFFF;
}

.post-user .post-user-info h1:hover {
  text-decoration: underline;
  text-decoration-color: #FFFFFF;
}

.post-user .post-user-info h2 {
  font-size: 14px;
}

.post-faculty h3 {
  font-size: 16px;
  padding-top: 20px;
}

.post-user p {
  font-size: 16px;
}

@media screen and (min-width: 480px) {
  .post-user {
    max-width: 700px;
  }
}
</style>

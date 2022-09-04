<template>
  <div id="notifications">
    <div class="notifications-container">
      <h2 id="friend-requests-title">Cereri de prietenie <span class="badge badge-light">{{ pendingFriendships.length }}</span></h2>
      <div class="friends-list">
        <h1 v-if="!pendingFriendships.length">Nu exista cereri de prietenie la momentul actual</h1>
        <div class="friend-request-container" v-else v-for="friendship in pendingFriendships" :key="friendship.friendshipId">
          <router-link :to="{path: '/profile/' + friendship.id}">
            <h2>{{ friendship.firstName }} {{ friendship.lastName }}</h2>
          </router-link>
          <router-link :to="{path: '/profile/' + friendship.id}">
            <div class="img-container">
              <img :src="friendship.profileImage" alt="default-friend-request.png">
            </div>
          </router-link>
          <div class="request-buttons">
            <button type="button" class="btn btn-success accept-button" @click="acceptFriendRequest(friendship.friendshipId)">Accepta</button>
            <button type="button" class="btn btn-danger decline-button" @click="rejectFriendRequest(friendship.friendshipId)">Refuza</button>
            <div class="clearfix"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UserService from "../../services/authentication/UserService";

export default {
  name: 'Notifications',
  data() {
    return {
      pendingFriendships: []
    }
  },
  mounted() {
    this.loadFriendRequests()
  },
  methods: {
    loadFriendRequests: function () {
      UserService.getFriendRequests({ userId: this.$store.state.auth.user.id }).then(friendships => {
        this.pendingFriendships = JSON.parse(JSON.stringify(friendships.data.data))
      }).catch(() => {
        this.toast('b-toaster-bottom-right', "danger", "Eroare", "A aparut o eroare la incarcarea cererilor de prietenie.")
      })
    },
    acceptFriendRequest: function (id) {
      UserService.acceptFriendRequest({ friendshipId: id }).then(result => {
        if (result.success == true) {
          let acceptIndex = this.pendingFriendships.findIndex((request) => request.friendshipId == id)
          this.pendingFriendships.splice(acceptIndex, 1);
          this.toast('b-toaster-bottom-right', "success", "Succes", "Cererea de prietenie a fost acceptata")
        } else {
          this.toast('b-toaster-bottom-right', "danger", "Eroare", "A aparut o eroare la acceptarea cererii de prietenie.")
        }
      }).catch(() => {
        this.toast('b-toaster-bottom-right', "danger", "Eroare", "A aparut o eroare la acceptarea cererii de prietenie.")
      })
    },
    rejectFriendRequest: function (id) {
      UserService.rejectFriendRequest({ friendshipId: id }).then(result => {
        if (result.success == true) {
          let rejectedIndex = this.pendingFriendships.findIndex((request) => request.friendshipId == id)
          this.pendingFriendships.splice(rejectedIndex, 1);
          this.toast('b-toaster-bottom-right', "info", "Succes", "Cererea de prietenie a fost refuzată")
        } else {
          this.toast('b-toaster-bottom-right', "danger", "Eroare", "A aparut o eroare la refuzarea cererii de prietenie.")
        }
      }).catch(() => {
        this.toast('b-toaster-bottom-right', "danger", "Eroare", "A aparut o eroare la refuzarea cererii de prietenie.")
      })
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

<style>
.notifications-container {
  width: 1000px;
  margin: 0 auto;
  padding-top: 75px;
}

#friend-requests-title {
  font-size: 26px;
  padding-bottom: 10px;
}

#notifications h2 {
  color: #FFFFFF;
}

.friends-list {
  width: 1000px;
  height: 300px;
  margin: 0 auto;
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
  background-color: #18191A;
  border-radius: 10px;
}

.friends-list h1 {
  color: #FFFFFF;
  font-size: 24px;
  text-align: center;
  padding-top: 130px;
}

.friend-request-container {
  display: inline-block;
  width: 250px;
  height: 300px;
  padding-top: 25px;
}

.friend-request-container .img-container {
  position: relative;
  width: 150px;
  height: 150px;
  border-radius: 150px;
  padding-left: 50px;
}

.friend-request-container .img-container img {
  position: absolute;
  width: 150px;
  height: 150px;
  border-radius: 150px;
}

.friend-request-container h2 {
  font-size: 18px;
  padding-bottom: 5px;
  color: #FFFFFF;
  text-align: center;
}

.friend-request-container a:hover {
  text-decoration-color: #FFFFFF;
}

.request-buttons {
  padding-top: 25px;
  padding-left: 37.5px;
  width: 205px;
  height: 42px;
}
.accept-button {
  width: 80px;
  float: left
}

.decline-button {
  width: 80px;
  float: right
}
</style>
<template>
  <div id="notifications">
    <div class="notifications-container">
      <h2 id="friend-requests-title">Cereri de prietenie</h2>
      <div class="friends-list">
<!--        <h1>Nu exista cereri de prietenie la momentul actual</h1>-->
        <div class="friend-request-container">
          <h2>Danescu Madalin</h2>
          <div class="img-container">
            <img src="https://imagini-profil.s3.eu-central-1.amazonaws.com/7IT87AUIJLHxpG71DOCVbi7Xk8wjUSWb.png" alt="default-friend-request.png">
          </div>
          <div class="request-buttons">
            <button type="button" class="btn btn-success accept-button">Accepta</button>
            <button type="button" class="btn btn-danger decline-button">Refuza</button>
            <div class="clearfix"></div>
          </div>
        </div>
<!--        <div class="friend-request-container">-->
<!--          <h2>Danescu Madalin</h2>-->
<!--          <div class="img-container">-->
<!--            <img src="https://imagini-profil.s3.eu-central-1.amazonaws.com/7IT87AUIJLHxpG71DOCVbi7Xk8wjUSWb.png" alt="default-friend-request.png">-->
<!--          </div>-->
<!--          <div class="request-buttons">-->
<!--            <button type="button" class="btn btn-success accept-button">Accepta</button>-->
<!--            <button type="button" class="btn btn-danger decline-button">Refuza</button>-->
<!--            <div class="clearfix"></div>-->
<!--          </div>-->
<!--        </div>-->
<!--        <div class="friend-request-container">-->
<!--          <h2>Danescu Madalin</h2>-->
<!--          <div class="img-container">-->
<!--            <img src="https://imagini-profil.s3.eu-central-1.amazonaws.com/7IT87AUIJLHxpG71DOCVbi7Xk8wjUSWb.png" alt="default-friend-request.png">-->
<!--          </div>-->
<!--          <div class="request-buttons">-->
<!--            <button type="button" class="btn btn-success accept-button">Accepta</button>-->
<!--            <button type="button" class="btn btn-danger decline-button">Refuza</button>-->
<!--            <div class="clearfix"></div>-->
<!--          </div>-->
<!--        </div>-->
      </div>
    </div>
  </div>
</template>

<script src="https://js.pusher.com/7.2/pusher.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
<script>
import Pusher from "pusher-js"
import UserService from "../../services/authentication/UserService";

export default {
  name: 'Notifications',
  data() {
    return {
      messages: []
    }
  },
  mounted() {
    this.loadFriendRequests()





    let pusher = new Pusher('43261e40347e6e4dbbcc', {
      cluster: 'eu'
    });

    this.messages = []

    let channel = pusher.subscribe('my-channel');
    channel.bind('my-event', function(data) {
      console.log(JSON.stringify(data))
      this.messages = JSON.stringify(data)
    })
  },
  methods: {
    loadFriendRequests: function () {
      UserService.getFriendRequests({ userId: this.$store.state.auth.user.id }).then(requests => {
        console.log(requests)
      }).catch(() => {
        this.toast('b-toaster-bottom-right', "danger", "Eroare", "A aparut o eroare la incarcarea cererilor de prietenie.")
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
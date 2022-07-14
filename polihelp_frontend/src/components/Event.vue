<template>
  <div class="Event">
    <div class="event-user">
      <div class="event-user-left">
        <router-link :to="{path: '/profile/' + eventData.authorId}">
          <div class="img-container-user">
            <img src="@/assets/images/default-user.png" alt="default-user.png">
          </div>
        </router-link>
        <div class="event-user-info">
          <router-link :to="{path: '/profile/' + eventData.authorId}">
            <h1>{{ eventUserData.lastName }} {{ eventUserData.firstName }}</h1>
          </router-link>
          <h2>{{ eventCreatedAt }}</h2>
        </div>
        <div class="clearfix"></div>
      </div>
      <div class="event-social-info">
        <div class="event-participants">
          <h2>{{ this.eventParticipants }}</h2>
          <div class="img-container-participants" @click="this.joinEvent">
            <img v-if="joinedEvent" src="@/assets/images/participants_filled.png" alt="participants_filled.png">
            <img v-else src="@/assets/images/participants.png" alt="participants.png">
          </div>
        </div>
      </div>
      <div class="clearfix"></div>
      <div class="event-faculty">
        <h3>
          {{ eventUserData.displayRoleType }} la {{ eventUserData.facultyName }}
          <br>
          {{ eventUserData.year }}
        </h3>
      </div>
      <h1>{{ eventData.name }}</h1>
      <hr color="#FFFFFF">
      <p>
        {{ eventData.content }}
      </p>
      <button v-if="eventData.authorId === this.$store.state.auth.user.id" type="button" class="btn btn-danger"
              @click="this.deleteEvent">Sterge Evenimentul</button>
    </div>
  </div>
</template>

<script>
import EventsService from "../services/EventsService";

export default {
  name: 'Event',
  props: {
    eventData: Object,
    eventUserData: Object,
    userEvents: Array
  },
  data() {
    return {
      eventCreatedAt: "",
      eventParticipants: 0,
      joinedEvent: false,
      blockJoinButton: false
    }
  },
  created() {
    this.eventParticipants = this.eventData.eventParticipants
    this.formatDate()
    this.checkIfJoined()
  },
  methods: {
    formatDate: function () {
      let date = new Date(this.eventData.createdAt)
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
      this.eventCreatedAt = date.getDate() + " " + month + " " + date.getFullYear() + " la " + hours + ":" + minutes
    },
    joinEvent: function () {
      this.blockJoinButton = true
      EventsService.joinEvent({userId: this.$store.state.auth.user.id, eventId: this.eventData.id}).then(response => {
        if (response.success === true) {
          if (response.joined === true) {
            this.joinedEvent = true
            this.eventParticipants = parseInt(this.eventParticipants) + 1
          } else {
            this.joinedEvent = false
            this.eventParticipants = parseInt(this.eventParticipants) - 1
          }
          this.blockJoinButton = false
        }
      }).catch(() => {
        this.toast('b-toaster-bottom-right', "danger", "Eroare", "A aparut o eroare in cursul participarii la eveniment.")
      })
    },
    checkIfJoined: function () {
      if (this.userEvents.some(e => ((e.eventId == this.eventData.id) && (e.userId == this.$store.state.auth.user.id)))) {
        this.joinedEvent = true
      }
    },
    deleteEvent: function () {
      EventsService.deleteEvent(this.eventData.id).then(response => {
        if (response.success === true) {
          this.$emit('event-deleted', { eventId: this.eventData.id })
          this.toast('b-toaster-bottom-right', "success", "Succes", "Evenimentul a fost sters cu succes");
        }
      }).catch(() => {
        this.toast('b-toaster-bottom-right', "danger", "Eroare", "A aparut o eroare in cursul stergerii evenimentului")
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
    }
  }
}
</script>

<style scoped>
.event-user {
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

.event-user .img-container-user img {
  position: absolute;
  border-radius: 50px;
  width: 75px;
  height: 75px;
}

.img-container-participants {
  position: relative;
  cursor: pointer;
  float: left;
  margin-right: 20px;
  width: 40px;
  height: 35px;
}

.event-user .img-container-participants img {
  position: absolute;
  width: 40px;
  height: 35px;
}

.event-user .event-user-info {
  margin-top: 14px;
  margin-left: 5px;
  float: left;
}

.event-user-left {
  float: left;
}

.event-social-info {
  float: right;
  margin-top: 7.5px;
}

.event-social-info h2 {
  font-size: 13px;
  font-weight: bold;
  margin-left: 16px;
}

.event-user .event-user-info h1 {
  font-size: 18px;
  color: #FFFFFF;
  text-decoration-color: #FFFFFF;
}

.event-user .event-user-info h1:hover {
  text-decoration: underline;
  text-decoration-color: #FFFFFF;
}

.event-user .event-user-info h2 {
  font-size: 14px;
}

.event-faculty h3 {
  font-size: 16px;
  padding-top: 20px;
}

.event-user p {
  font-size: 16px;
}
</style>
<template>
  <div id="addEvent">
    <ValidationObserver v-slot="{ handleSubmit }">
      <form name="form auth" @submit.prevent="handleSubmit(onSubmit)" method="POST" style="background-color: #FFFFFF;">
        <fieldset>
          <legend style="margin: 25px 0px; padding-top: 15px;"><span class="number">1</span> Detalii Eveniment</legend>

          <label for="name">Nume:</label>
          <ValidationProvider name="name" rules="required|min:3|max:100">
            <div slot-scope="{ errors }" class="input-group">
              <input v-model="event.name" type="text" class="input--style-3" id="name" name="name" placeholder="Nume">
              <p class="errorMessage">{{ errors[0] }}</p>
            </div>
          </ValidationProvider>

          <label for="location">Locatie:</label>
          <ValidationProvider name="location" rules="required|min:3|max:100">
            <div slot-scope="{ errors }" class="input-group">
              <input v-model="event.location" type="text" class="input--style-3" id="location" name="location" placeholder="Locatie">
              <p class="errorMessage">{{ errors[0] }}</p>
            </div>
          </ValidationProvider>

          <label for="startDate">Data Inceput:</label>
          <ValidationProvider name="startDate" rules="required">
            <div slot-scope="{ errors }" class="input-group">
              <input v-model="event.startDate" type="date" class="input--style-3" id="startDate" name="startDate" placeholder="Data Inceput">
              <p class="errorMessage">{{ errors[0] }}</p>
            </div>
          </ValidationProvider>

          <label for="endDate">Data Sfarsit:</label>
          <ValidationProvider name="endDate" rules="required">
            <div slot-scope="{ errors }" class="input-group">
              <input v-model="event.endDate" type="date" class="input--style-3" id="endDate" name="endDate" placeholder="Data Sfarsit">
              <p class="errorMessage">{{ errors[0] }}</p>
            </div>
          </ValidationProvider>

          <label for="content">Continut</label>
          <ValidationProvider>
            <div slot-scope="{ errors }" class="input-group">
              <input v-model="event.content" type="text" class="input--style-3" id="content" name="content" placeholder="Continut">
              <p class="errorMessage">{{ errors[0] }}</p>
            </div>
          </ValidationProvider>
        </fieldset>

        <button type="submit">Adauga Eveniment</button>
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
import EventsService from "../../services/EventsService";
let Filter = require('bad-words')
let filter = new Filter();
filter.addWords("cuvantObscen")

export default {
  name: 'AddEvent',
  data() {
    return {
      event: {
        name: "",
        authorId: this.$store.state.auth.user.id,
        location: "",
        startDate: "",
        endDate: "",
        content: ""
      },
      successful: false,
    }
  },
  methods: {
    onSubmit: function () {
      let currentDate = new Date()
      let startDate = new Date(this.event.startDate)
      let endDate = new Date(this.event.endDate)
      if (startDate > endDate) {
        this.successful = false
        this.toast('b-toaster-bottom-right', "danger", "Eroare", "Data de inceput nu poate fi dupa data de sfarsit.")
      } else if (startDate < currentDate) {
        this.successful = false
        this.toast('b-toaster-bottom-right', "danger", "Eroare", "Data de inceput nu poate fi inainte de data curenta.")
      } else {
        let createEventData = {
          authorId: this.event.authorId,
          name: filter.clean(this.event.name),
          location: filter.clean(this.event.location),
          content: filter.clean(this.event.location),
          startDate: this.event.startDate,
          endDate: this.event.endDate
        }
        EventsService.createEvent(createEventData).then(data => {
          this.successful = !!data.success

          let toastVariant = this.successful ? 'success' : 'danger'
          let toastTitle = this.successful ? "Succes" : "Eroare"
          this.toast('b-toaster-bottom-right', toastVariant, toastTitle, data.message);
        }).catch(() => {
          this.successful = false
          this.toast('b-toaster-bottom-right', "danger", "Eroare", "A aparut o eroare in timpul postarii.")
        })
      }
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
    },
  }
}
</script>

<style scoped>
#addEvent {
  margin-top: 50px;
}
</style>
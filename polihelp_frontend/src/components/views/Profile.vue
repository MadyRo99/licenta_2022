<template>
  <div id="profile">
    <div class="profile-background" :style="inlineBgImage()"></div>
    <div class="profile-user-box">
      <div>
        <div class="img-container">
          <img src="@/assets/images/upb_register.jpg" alt="default-user.png">
        </div>
        <div class="profile-user-info">
          <h1>{{ this.$store.state.auth.user.lastName }} {{ this.$store.state.auth.user.firstName }}</h1>
          <h2>Student la {{ this.$store.state.auth.user.faculty.name }}</h2>
          <h2>{{ this.$store.state.auth.user.year }}</h2>
          <h2>
            Interese:
            <span class="badge badge-secondary">IT</span>
            <span class="badge badge-secondary">Circuite</span>
          </h2>
        </div>
      </div>
    </div>
    <div class="after-profile">
      <div class="profile-buttons">
        <div class="row justify-content-center">
          <div class="col-6">
            <button type="button" class="btn btn-primary" v-b-modal.edit-profile-modal>Editeaza Profilul</button>
          </div>
          <div class="col-6">
            <button type="button" class="btn btn-primary">Editeaza Interesele</button>
          </div>
        </div>
        <div class="row justify-content-center">
          <div class="col-6">
            <button type="button" class="btn btn-primary" v-b-modal.modal-1>Prieteni <span class="badge badge-light">2</span></button>
          </div>
          <div class="col-6">
            <button type="button" class="btn btn-primary">Grupuri <span class="badge badge-light">1</span></button>
          </div>
        </div>
      </div>
      <div class="profile-user-posts">
        <Post></Post>
        <Post></Post>
      </div>
    </div>
    <b-modal id="modal-1" title="Prieteni" class="profile-friends-modal" size="lg" :show-close="false" data-backdrop="static" data-keyboard="false" centered scrollable ok-only ok-variant="secondary" ok-title="Inchide">
      <div class="profile-friend-modal-container">
        <div class="profile-friend">
          <div class="img-container">
            <img src="@/assets/images/upb_register.jpg" alt="default-user.png">
          </div>
          <div class="friend-details">
            <a href="#"><h1>Mihai Petre</h1></a>
            <h2>Student la Facultatea de Electronica, Telecomunicatii si Tehnologia Informatiei | Anul II - Licenta</h2>
          </div>
          <div class="clearfix"></div>
        </div>
      </div>
    </b-modal>
    <b-modal
        id="edit-profile-modal"
        ref="modal"
        ok-title="Actualizeaza"
        cancel-title="Anuleaza"
        centered
        scrollable
        no-close-on-backdrop
        size="lg"
        @ok="editProfileSubmit"
        title="Actualizare Profil"
    >
      <ValidationProvider v-slot="{ handleSubmit }">
        <form name="form auth" @submit.prevent="handleSubmit(editProfileSubmit)" method="POST" style="background-color: #FFFFFF;">
          <fieldset>
            <legend style="margin: 25px 0px;"><span class="number">1</span> Detalii Personale</legend>

            <label for="lastName">Nume:</label>
            <ValidationProvider name="lastName" :rules="{ required: true, min: 2, max: 20, regex: /^[A-Za-z-\s]*$/ }">
              <div slot-scope="{ errors }" class="input-group">
                <input v-model="user.lastName" type="text" class="input--style-3" id="lastName" name="lastName" placeholder="Nume" :disabled="successful">
                <p class="errorMessage">{{ errors[0] }}</p>
              </div>
            </ValidationProvider>

            <label for="firstName">Prenume:</label>
            <ValidationProvider name="firstName" :rules="{ required: true, min: 2, max: 20, regex: /^[A-Za-z-\s]*$/ }">
              <div slot-scope="{ errors }" class="input-group">
                <input v-model="user.firstName" type="text" class="input--style-3" id="firstName" name="firstName" placeholder="Prenume" :disabled="successful">
                <p class="errorMessage"> {{ errors[0] }}</p>
              </div>
            </ValidationProvider>

            <label for="email">Email:</label>
            <ValidationProvider name="email" rules="required|email|max:50">
              <div slot-scope="{ errors }" class="input-group">
                <input v-model="user.email" type="email" class="input--style-3" id="email" name="email" placeholder="Email" :disabled="successful">
                <p class="errorMessage">{{ errors[0] }}</p>
              </div>
            </ValidationProvider>

          </fieldset>

          <fieldset>
            <legend style="margin: 25px 0px;"><span class="number">2</span> Detalii Facultate</legend>

            <label for="faculty">Facultate</label>
            <ValidationProvider name="faculty" rules="required">
              <div slot-scope="{ errors }" class="input-group">
                <select v-model="user.facultyId" name="faculty" id="faculty" :disabled="successful">
                  <option v-for="faculty in faculties" :key="faculty.id" :value="faculty.id">{{ faculty.name }}</option>
                </select>
                <p class="errorMessage">{{ errors[0] }}</p>
              </div>
            </ValidationProvider>

            <label for="role">Rol</label>
            <ValidationProvider name="role" rules="required">
              <div slot-scope="{ errors }" class="input-group">
                <select v-model="user.roleId" name="role" id="role" :disabled="successful">
                  <option v-for="role in roles" :key="role.id" :value="role.id">{{ role.name }}</option>
                </select>
                <p class="errorMessage">{{ errors[0] }}</p>
              </div>
            </ValidationProvider>

            <label v-if="user.roleId == 1 || user.roleId == 2" for="year">An</label>
            <ValidationProvider v-if="user.roleId == 1 || user.roleId == 2" name="year" rules="required">
              <div slot-scope="{ errors }" class="input-group">
                <select v-model="user.year" name="year" id="year" :disabled="successful">
                  <option v-if="user.roleId === 1" value="Anul 1 Licenta">Anul 1 Licenta</option>
                  <option v-if="user.roleId === 1" value="Anul 2 Licenta">Anul 2 Licenta</option>
                  <option v-if="user.roleId === 1" value="Anul 3 Licenta">Anul 3 Licenta</option>
                  <option v-if="user.roleId === 1" value="Anul 4 Licenta">Anul 4 Licenta</option>
                  <option v-if="user.roleId === 2" value="Anul 1 Master">Anul 1 Master</option>
                  <option v-if="user.roleId === 2" value="Anul 2 Master">Anul 2 Master</option>
                </select>
                <p class="errorMessage">{{ errors[0] }}</p>
              </div>
            </ValidationProvider>

          </fieldset>
        </form>
      </ValidationProvider>
    </b-modal>
  </div>
</template>

<script>
import Post from "../Post";
import UtilsService from "../../services/UtilsService";

export default {
  name: 'Profile',
  components: { Post },
  data() {
    return {
      user: {
        id: this.$store.state.auth.user.id,
        lastName: this.$store.state.auth.user.lastName,
        firstName: this.$store.state.auth.user.firstName,
        email: this.$store.state.auth.user.email,
        year: this.$store.state.auth.user.year,
        roleId: this.$store.state.auth.user.roleId,
        facultyId: this.$store.state.auth.user.faculty.id
      },
      faculties: [],
      roles: [],
      successful: false
    }
  },
  created() {
    this.populateFaculties();
    this.populateRoles();
  },
  methods: {
    populateFaculties: function () {
      UtilsService.getFaculties().then(faculties => {
        this.faculties = JSON.parse(JSON.stringify(faculties.data))
      }).catch(() => {
        this.toast('b-toaster-bottom-right', "danger", "Eroare", "A aparut o eroare la incarcarea paginii.")
      })
    },
    populateRoles: function () {
      UtilsService.getRoles().then(roles => {
        this.roles = JSON.parse(JSON.stringify(roles.data))
        this.roles = this.roles.filter(role => role.name !== "Profesor")
      }).catch(() => {
        this.toast('b-toaster-bottom-right', "danger", "Eroare", "A aparut o eroare la incarcarea paginii.")
      })
    },
    editProfileSubmit: function () {
      this.$store.dispatch('auth/update', this.user, {root: true}).then(
          data => {
            this.successful = data.success

            let toastVariant = this.successful ? 'success' : 'danger'
            let toastTitle = this.successful ? "Succes" : "Eroare"
            this.toast('b-toaster-bottom-right', toastVariant, toastTitle, data.message)

            if (this.successful) {
              this.$store.dispatch('auth/setUserDetails', data, {root: true}).then(() => {
                this.$bvModal.hide('edit-profile-modal')
              })
            }
          },
          () => {
            this.successful = false
            this.toast('b-toaster-bottom-right', "danger", "Eroare", "A aparut o eroare la actualizarea profilului.")
          }
      )
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
    inlineBgImage() {
      let src = "/images/default-user-background.jpg";
      let bgImage = require('@/assets' + src)

      return {
        backgroundImage: `url("${bgImage}")`,
      }
    }
  }
}
</script>

<style scoped>

.profile-background {
  width: 100%;
  height: 400px;
}

.profile-user-box {
  position: relative;
  background-color: #4BC970;
  border-radius: 30px;
  top: -175px;
  width: 550px;
  margin: 0 auto;
  -webkit-box-shadow: 0px 0px 25px 5px rgba(255,255,255,0.2);
  box-shadow: 0px 0px 25px 5px rgba(255,255,255,0.2);
}

.profile-user-info {
  padding: 50px 50px 15px;
}

.profile-user-info span {
  margin-right: 5px;
}

.profile-user-box h1 {
  text-align: center;
  padding: 0 25px;
  font-size: 28px;
  color: #FFFFFF;
}

.profile-user-box h2 {
  text-align: center;
  padding: 0 25px;
  font-size: 20px;
  color: #FFFFFF;
}

.profile-user-box .img-container {
  position: relative;
  padding-top: 30px;
  margin: 0 auto;
  width: 150px;
  height: 150px;
}

.profile-user-box .img-container img {
  position: absolute;
  border-radius: 150px;
  width: 150px;
  height: 150px;
  -webkit-box-shadow: 0px 0px 25px 10px rgba(0,0,0,0.25);
  box-shadow: 0px 0px 25px 10px rgba(0,0,0,0.25);
}

.after-profile {
  position: relative;
  top: -150px;
}

.profile-buttons {
  width: 550px;
  margin: 0 auto;
}

.profile-user-posts {
  margin-top: 15px;
}

/deep/ .close {
  display: none;
}

.profile-friend-modal-container {
  max-height: 350px;
  overflow: auto;
}

.profile-friend:first-child {
  padding-top: 5px;
}

.profile-friend:last-child {
  padding-bottom: 0px;
}

.profile-friend {
  padding-bottom: 25px;
}

.profile-friend .img-container {
  position: relative;
  width: 50px;
  height: 50px;
  float: left;
}

.profile-friend img {
  position: absolute;
  width: 50px;
  height: 50px;
  border-radius: 150px;
}

.friend-details {
  float: left;
  padding-left: 10px;
  padding-top: 5px;
}

.friend-details h1 {
  font-size: 16px;
}

.friend-details h2 {
  font-size: 14px;
}

</style>
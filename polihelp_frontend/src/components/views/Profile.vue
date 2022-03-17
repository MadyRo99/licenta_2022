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
          <h2>{{ displayRoleType }} la {{ this.$store.state.auth.user.faculty.name }}</h2>
          <h2 v-if="this.$store.state.auth.user.roleId != 3 ">{{ this.$store.state.auth.user.year }}</h2>
          <h2 v-if="interests.length">
            Interese:
            <span class="badge badge-secondary" v-for="interest in interests" :key="randomNumber(interest)">{{ interest.interest }}</span>
          </h2>
        </div>
      </div>
    </div>
    <div class="after-profile">
      <div class="profile-buttons">
        <div class="row justify-content-center" v-if="user.id">
          <div class="col-6">
            <button type="button" class="btn btn-primary" v-b-modal.edit-profile-modal>Editeaza Profilul</button>
          </div>
          <div class="col-6">
            <button type="button" class="btn btn-primary" v-b-modal.edit-interests-modal>Editeaza Interesele</button>
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
      </div>
    </div>
    <b-modal id="modal-1" title="Prieteni" class="profile-friends-modal" size="lg" :show-close="false" data-backdrop="static" data-keyboard="false" centered scrollable ok-only ok-variant="secondary" ok-title="Inchide">
      <div class="profile-friend-modal-container">
        <div class="profile-friend">
          <div class="img-container">
            <img src="@/assets/images/upb_register.jpg" alt="default-user.png">
          </div>
          <div class="friend-details">
            <div>
              <a href="#" style="float: left;"><h1>Mihai Petre</h1></a>
              <button type="button" class="btn btn-danger btn-sm" style="float: right; width: 75px; height: 30px; position: relative; top: -5px;">Sterge</button>
              <div class="clearfix"></div>
            </div>
            <h2>Student la Facultatea de Electronica, Telecomunicatii si Tehnologia Informatiei | Anul II - Licenta</h2>
          </div>
          <div class="clearfix"></div>
        </div>
        <div class="profile-friend">
          <div class="img-container">
            <img src="@/assets/images/upb_register.jpg" alt="default-user.png">
          </div>
          <div class="friend-details">
            <div>
              <a href="#" style="float: left;"><h1>Mihai Petre</h1></a>
              <button type="button" class="btn btn-danger btn-sm" style="float: right; width: 75px; height: 30px; position: relative; top: -5px;">Sterge</button>
              <div class="clearfix"></div>
            </div>
            <h2>Student la Facultatea de Electronica | Anul II - Licenta</h2>
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
        size="lg"
        @ok="editProfileSubmit"
        title="Actualizare Profil"
    >
        <form name="form auth" @submit.stop.prevent="editProfileSubmit" method="POST" style="background-color: #FFFFFF;">
          <fieldset>
            <legend style="margin: 25px 0px;"><span class="number">1</span> Detalii Personale</legend>

            <label for="lastName">Nume:</label>
            <ValidationProvider>
              <input v-model="user.lastName" type="text" class="input--style-3" id="lastName" name="lastName" placeholder="Nume">
            </ValidationProvider>

            <label for="firstName">Prenume:</label>
            <ValidationProvider>
              <input v-model="user.firstName" type="text" class="input--style-3" id="firstName" name="firstName" placeholder="Prenume">
            </ValidationProvider>

            <label for="email">Email:</label>
            <ValidationProvider>
              <input v-model="user.email" type="email" class="input--style-3" id="email" name="email" placeholder="Email">
            </ValidationProvider>

          </fieldset>

          <fieldset>
            <legend style="margin: 25px 0px;"><span class="number">2</span> Detalii Facultate</legend>

            <label for="faculty">Facultate</label>
            <ValidationProvider>
              <select v-model="user.facultyId" name="faculty" id="faculty">
                <option v-for="faculty in faculties" :key="faculty.id" :value="faculty.id">{{ faculty.name }}</option>
              </select>
            </ValidationProvider>

            <label for="role" v-if="user.roleId != 3">Rol</label>
            <ValidationProvider v-if="user.roleId != 3">
              <select v-model="user.roleId" name="role" id="role" @change="user.year = null">
                <option v-for="role in roles" :key="role.id" :value="role.id">{{ role.name }}</option>
              </select>
            </ValidationProvider>

            <label v-if="user.roleId != 3" for="year">An</label>
            <ValidationProvider v-if="user.roleId != 3">
              <select v-model="user.year" name="year" id="year">
                <option v-if="user.roleId == 1" value="Anul 1 Licenta">Anul 1 Licenta</option>
                <option v-if="user.roleId == 1" value="Anul 2 Licenta">Anul 2 Licenta</option>
                <option v-if="user.roleId == 1" value="Anul 3 Licenta">Anul 3 Licenta</option>
                <option v-if="user.roleId == 1" value="Anul 4 Licenta">Anul 4 Licenta</option>
                <option v-if="user.roleId == 2" value="Anul 1 Master">Anul 1 Master</option>
                <option v-if="user.roleId == 2" value="Anul 2 Master">Anul 2 Master</option>
              </select>
            </ValidationProvider>

          </fieldset>
        </form>
    </b-modal>
    <b-modal
        id="edit-interests-modal"
        ref="modal"
        ok-title="Salveaza"
        cancel-title="Anuleaza"
        centered
        scrollable
        @ok="submitUpdateInterests"
        size="md"
        title="Actualizare Interese"
    >
      <TagInput :user-id="user.id" :initial-tags="interests" ref="interestsTagInput" @interests-updated="updateDisplayedInterests"></TagInput>
    </b-modal>
  </div>
</template>

<script>
import Post from "../Post";
import UtilsService from "../../services/UtilsService";
import TagInput from "../utils/TagInput";

export default {
  name: 'Profile',
  components: { Post, TagInput },
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
      userProfile: {

      },
      faculties: [],
      interests: [],
      roles: []
    }
  },
  computed: {
    displayRoleType() {
      if (this.$store.state.auth.user.roleId == 1) {
        return "Student"
      }

      if (this.$store.state.auth.user.roleId == 2) {
        return "Masterand"
      }

      if (this.$store.state.auth.user.roleId == 3) {
        return "Profesor"
      }

      return ""
    }
  },
  created() {
    if (this.$route.params.id != this.$store.state.auth.user.id) {
      this.populateUser()
    }
    this.populateFaculties()
    this.populateInterests()
    this.populateRoles()
  },
  methods: {
    populateUser: function () {
      let userId = 1
      UtilsService.getUserProfileDetails(userId).then(user => {
        this.userProfile = JSON.parse(JSON.stringify(user.data.userDetails))
      }).catch(() => {
        this.toast('b-toaster-bottom-right', "danger", "Eroare", "A aparut o eroare la incarcarea paginii.")
      })
    },
    populateFaculties: function () {
      UtilsService.getFaculties().then(faculties => {
        this.faculties = JSON.parse(JSON.stringify(faculties.data))
      }).catch(() => {
        this.toast('b-toaster-bottom-right', "danger", "Eroare", "A aparut o eroare la incarcarea paginii.")
      })
    },
    populateInterests: function () {
      UtilsService.getInterests(this.user.id).then(interests => {
        this.interests = JSON.parse(JSON.stringify(interests.data))
      }).catch(() => {
        this.toast('b-toaster-bottom-right', "danger", "Eroare", "A aparut o eroare la incarcarea paginii.")
      })
    },
    populateRoles: function () {
      UtilsService.getRoles().then(roles => {
        this.roles = JSON.parse(JSON.stringify(roles.data))
        this.roles = this.roles.filter(role => role.name !== "Profesor")
      }).catch(() => {
        this.toast('b-toaster-bottom-right', "danger", "Eroare", "A aparut o eroare la incarcarea paginii")
      })
    },
    editProfileSubmit(event) {
      event.preventDefault()
      if (this.validateUpdateUserInput()) {
        this.$store.dispatch('auth/update', this.user, {root: true}).then(
            data => {
              let toastVariant = data.success ? 'success' : 'danger'
              let toastTitle = data.success ? "Succes" : "Eroare"
              this.toast('b-toaster-bottom-right', toastVariant, toastTitle, data.message)
              if (data.success) {
                this.$store.dispatch('auth/setUserDetails', data, {root: true}).then(() => {
                  this.$bvModal.hide('edit-profile-modal')
                })
              }
            },
            () => {
              this.toast('b-toaster-bottom-right', "danger", "Eroare", "A aparut o eroare la actualizarea profilului.")
            }
        )
      }
    },
    submitUpdateInterests() {
      this.$refs.interestsTagInput.editInterestsSubmit()
    },
    updateDisplayedInterests(payload) {
      this.interests = payload.interests.map((interest) => ({ interest: interest }))
    },
    validateUpdateUserInput() {
      if (this.user.lastName.length < 2 || this.user.lastName.length > 20) {
        this.toast('b-toaster-bottom-right', "danger", "Eroare", "Prenumele trebuie sa contina intre 2 si 20 de caractere")
        return false
      }

      if (!/^[A-Za-z-\s]*$/.test(this.user.lastName)) {
        this.toast('b-toaster-bottom-right', "danger", "Eroare", 'Prenumele poate sa contina doar litere, spatii sau caracterul "-"')
        return false
      }

      if (this.user.firstName.length < 2 || this.user.firstName.length > 20) {
        this.toast('b-toaster-bottom-right', "danger", "Eroare", "Numele trebuie sa contina intre 2 si 20 de caractere")
        return false
      }

      if (!/^[A-Za-z-\\s]*$/.test(this.user.firstName)) {
        this.toast('b-toaster-bottom-right', "danger", "Eroare", 'Numele poate sa contina doar litere, spatii sau caracterul "-"')
        return false
      }

      if (!this.validateEmail(this.user.email)) {
        this.toast('b-toaster-bottom-right', "danger", "Eroare", 'Campul pentru email nu este valid')
        return false
      }

      if (!this.user.facultyId) {
        this.toast('b-toaster-bottom-right', "danger", "Eroare", 'Campul pentru facultate este obligatoriu')
        return false
      }

      if (!this.user.roleId) {
        this.toast('b-toaster-bottom-right', "danger", "Eroare", 'Campul pentru rol este obligatoriu')
        return false
      }

      if (this.user.roleId != 3 && !this.user.year) {
        this.toast('b-toaster-bottom-right', "danger", "Eroare", 'Campul pentru an este invalid')
        return false
      }

      return true
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
    validateEmail(email) {
      return String(email)
          .toLowerCase()
          .match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
    },
    inlineBgImage() {
      let src = "/images/default-user-background.jpg";
      let bgImage = require('@/assets' + src)

      return {
        backgroundImage: `url("${bgImage}")`,
      }
    },
    randomNumber() {
      return Math.floor(Math.random() * (10000 - 1 + 1) + 1)
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
  width: 100%;
  margin: 0 auto;
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
  width: 65px;
  height: 65px;
  float: left;
}

.profile-friend img {
  position: absolute;
  width: 65px;
  height: 65px;
  border-radius: 150px;
}

.friend-details {
  float: left;
  width: 700px;
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
<template>
  <div id="register">
    <ValidationObserver v-slot="{ handleSubmit }">
      <form name="form" @submit.prevent="handleSubmit(onSubmit)" method="POST">
        <div class="loader">
          <bounce-loader class="custom-class" :loading="successful" :color="loader.color" :size="loader.size" :margin="loader.margin"></bounce-loader>
        </div>
        <h1 style="padding-top: 25px;">Inregistrare</h1>

        <fieldset>
          <legend style="margin: 25px 0px;"><span class="number">1</span> Detalii Personale</legend>

          <label for="lastName">Nume:</label>
          <ValidationProvider name="lastName" :rules="{ min: 2, max: 20, regex: /^[A-Za-z-\s]*$/ }">
            <div slot-scope="{ errors }" class="input-group">
              <input v-model="user.lastName" type="text" class="input--style-3" id="lastName" name="lastName" placeholder="Nume" :disabled="successful">
              <p class="errorMessage">{{ errors[0] }}</p>
            </div>
          </ValidationProvider>

          <label for="firstName">Prenume:</label>
          <ValidationProvider name="firstName" :rules="{ min: 2, max: 20, regex: /^[A-Za-z-\s]*$/ }">
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

          <label for="password">Parola:</label>
          <ValidationProvider name="password" rules="required|min:6|max:50">
            <div slot-scope="{ errors }" class="input-group">
              <input v-model="user.password" type="password" class="input--style-3" id="password" name="password" placeholder="Parolă" :disabled="successful">
              <p class="errorMessage">{{ errors[0] }}</p>
            </div>
          </ValidationProvider>

          <ValidationProvider name="gender" rules="required">
            <div slot-scope="{ errors }" class="input-group">
              <div style="width: 100%; margin-bottom: 10px;">
                <input v-model="user.gender" type="radio" id="masculin" value="Masculin" name="gender" :disabled="successful">
                <label for="masculin" class="light">Masculin</label>
              </div>
              <br>
              <div style="width: 100%; margin-bottom: 20px;">
                <input v-model="user.gender" type="radio" id="feminin" value="Feminin" name="gender" :disabled="successful">
                <label for="feminin" class="light">Feminin</label>
              </div>
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
                <option v-if="user.roleId == 1" value="Anul 1 Licenta">Anul 1 Licenta</option>
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

        <button type="submit" :disabled="successful">Înregistrare</button>
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
import UtilsService from "../../../services/UtilsService"
import { BounceLoader } from '@saeris/vue-spinners';

require('@/assets/css/auth.css')

export default {
  name: 'Register',
  components: { BounceLoader },
  data() {
    return {
      user: {
        lastName: '',
        firstName: '',
        email: '',
        password: '',
        gender: '',
        year: '',
        roleId: '',
        facultyId: ''
      },
      loader: {
        color: "#3fc76a",
        size: 200,
        margin: 0,
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
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn
    }
  },
  mounted() {
    if (this.loggedIn) {
      this.$router.push('/profile');
    }
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
      }).catch(() => {
        this.toast('b-toaster-bottom-right', "danger", "Eroare", "A aparut o eroare la incarcarea paginii.")
      })
    },
    onSubmit: function () {
      this.$store.dispatch('auth/register', this.user, {root: true}).then(
          data => {
            this.successful = !!data.success;

            let toastVariant = this.successful ? 'success' : 'danger'
            let toastTitle = this.successful ? "Succes" : "Eroare"
            this.toast('b-toaster-bottom-right', toastVariant, toastTitle, data.message);

            if (this.successful) {
              setTimeout(() => {
                this.$router.push("login")
              }, 2500)
            }
          },
          () => {
            this.successful = false
            this.toast('b-toaster-bottom-right', "danger", "Eroare", "A aparut o eroare la inregistrarea utilizatorului.")
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
        autoHideDelay: 50000000
      })
    },
  }
}
</script>
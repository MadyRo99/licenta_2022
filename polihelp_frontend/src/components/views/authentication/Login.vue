<template>
  <div id="login">
    <ValidationObserver v-slot="{ handleSubmit }">
      <form name="form auth" @submit.prevent="handleSubmit(onSubmit)" method="POST">

        <div class="loader">
          <bounce-loader class="custom-class" :loading="successful" :color="loader.color" :size="loader.size" :margin="loader.margin"></bounce-loader>
        </div>

        <h1 style="padding-top: 25px;">Autentificare</h1>

        <fieldset>

          <label for="email">Email:</label>
          <ValidationProvider name="email" rules="required|email|max:50">
            <div slot-scope="{ errors }" class="input-group">
              <input v-model="user.email" type="email" class="input--style-3" id="email" name="email" placeholder="Email">
              <p class="errorMessage">{{ errors[0] }}</p>
            </div>
          </ValidationProvider>

          <label for="password">Parola:</label>
          <ValidationProvider name="password" rules="required|min:6|max:40">
            <div slot-scope="{ errors }" class="input-group">
              <input v-model="user.password" type="password" class="input--style-3" id="password" name="password" placeholder="Parolă">
              <p class="errorMessage">{{ errors[0] }}</p>
            </div>
          </ValidationProvider>

        </fieldset>

        <button type="submit">Conectare</button>
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
import { BounceLoader } from '@saeris/vue-spinners';

require('@/assets/css/auth.css')

export default {
  name: 'Login',
  components: { BounceLoader },
  data() {
    return {
      user: {
        email: '',
        password: ''
      },
      loader: {
        color: "#3fc76a",
        size: 200,
        margin: 0,
      },
      successful: false
    }
  },
  methods: {
    onSubmit: function () {
      this.$store.dispatch('auth/login', this.user, {root: true}).then(
          data => {
            this.successful = !!data.success;

            let toastVariant = this.successful ? 'success' : 'danger'
            let toastTitle = this.successful ? "Succes" : "Eroare"
            this.toast('b-toaster-bottom-right', toastVariant, toastTitle, data.message);

            if (this.successful) {
              this.$store.dispatch('auth/setUserDetails', data, {root: true}).then(() => {
                this.$router.push("/")
              })
            }
          },
          () => {
            this.successful = false
            this.toast('b-toaster-bottom-right', "danger", "Eroare", "A aparut o eroare la autentificare.")
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
  }
}
</script>
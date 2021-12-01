<template>
  <div id="login">
    <ValidationObserver v-slot="{ handleSubmit }">
      <form name="form" @submit.prevent="handleSubmit(onSubmit)" method="POST">
        <div v-if="!successful">
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
        </div>
      </form>
    </ValidationObserver>

    <div v-if="message"
         class="alert"
         :class="successful ? 'alert-success' : 'alert-danger'"
    >{{ message }}</div>
  </div>
</template>

<script>
import User from "../../../models/User"

require('@/assets/css/auth.css')

export default {
  name: 'Login',
  data() {
    return {
      user: new User('', '', '', ''),
      faculties: [],
      roles: [],
      submitted: false,
      successful: false,
      message: ''
    }
  },
}
</script>
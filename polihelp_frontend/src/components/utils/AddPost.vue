<template>
  <div class="AddPost">
    <ValidationObserver v-slot="{ handleSubmit }">
      <form name="form" @submit.prevent="handleSubmit(onSubmit)" method="POST" class="postContentForm">
        <ValidationProvider name="postContent" :rules="{ required: true, min: 2, max: 500 }">
          <div slot-scope="{ errors }" class="input-group postContentText">
            <textarea v-model="postContent" class="input--style-3" id="postContent" name="postContent" :placeholder="postPlaceholderContent">
            </textarea>
            <p class="errorMessage">{{ errors[0] }}</p>
          </div>
        </ValidationProvider>

        <button type="submit">Posteaza</button>
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
import { setInteractionMode } from 'vee-validate'
import PostsService from "../../services/PostsService";

setInteractionMode('passive')

require('@/assets/css/style.css')

export default {
  name: 'AddPost',
  data() {
    return {
      postContent: "",
      successful: false
    }
  },
  computed: {
    postPlaceholderContent: function () {
      return "La ce te gandesti, " + this.$store.state.auth.user.firstName + "?"
    }
  },
  methods: {
    onSubmit: function () {
      PostsService.createPost(this.postContent).then(data => {
          this.successful = !!data.success

          let toastVariant
        let toastTitle
          if (this.successful) {
            toastVariant = "success"
            toastTitle = "Succes"
            this.postContent = ""
          } else {
            toastVariant = "danger"
            toastTitle = "Eroare"
          }
          this.toast('b-toaster-bottom-right', toastVariant, toastTitle, data.message);
      }).catch(() => {
        this.successful = false
        this.toast('b-toaster-bottom-right', "danger", "Eroare", "A aparut o eroare in timpul postarii.")
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

<style scoped></style>

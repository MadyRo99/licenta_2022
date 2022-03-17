<template>
  <div class="tagInput">
    <div v-for="(tag, index) in tags" :key="randomNumber(tag)" class="tag-input__tag">
      <span @click='removeTag(index)'>x</span>
      {{ tag }}
    </div>
    <input
        type='text'
        placeholder="Adauga interese..."
        class='tag-input__text'
        @ok="editInterestsSubmit"
        @keydown.enter='addTag'
        @keydown.188='addTag'
        @keydown.delete='removeLastTag'
    />
  </div>
</template>

<script>
export default {
  name: 'TagInput',
  props: {
    initialTags: Array,
    userId: Number
  },
  data () {
    return {
      tags: []
    }
  },
  mounted() {
    this.tags = this.initialTags.map(a => a.interest)
  },
  methods: {
    addTag(event) {
      event.preventDefault()
      let val = event.target.value.trim()
      if (val.length > 0) {
        this.tags.push(val)
        event.target.value = ''
      }
    },
    removeTag(index) {
      this.tags.splice(index, 1)
    },
    removeLastTag(event) {
      if (event.target.value.length === 0) {
        this.removeTag(this.tags.length - 1)
      }
    },
    editInterestsSubmit() {
      let updateInterests = {
        interests: this.tags,
        userId: this.userId
      }

      this.$store.dispatch('auth/updateInterests', updateInterests, {root: true}).then(
          data => {
            if (data.success) {
              this.$emit('interests-updated', { interests: this.tags })
            }
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
        autoHideDelay: 3000
      })
    },
    randomNumber() {
      return Math.floor(Math.random() * (10000 - 1 + 1) + 1)
    }
  }
}
</script>

<style scoped>
.tag-input__tag {
  height: 30px;
  float: left;
  margin-right: 10px;
  background-color: #eee;
  margin-top: 10px;
  line-height: 30px;
  padding: 0 5px;
  border-radius: 5px;
}

.tag-input__tag > span {
  cursor: pointer;
  opacity: 0.75;
}

.tag-input__text {
  border: none;
  outline: none;
  font-size: 0.9em;
  line-height: 50px;
  background: none;
}
</style>
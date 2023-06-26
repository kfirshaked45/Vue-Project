<template>
  <form @submit.prevent="handleFormSubmit">
    <div v-if="!isLoggedIn && !isSigningUp">
      <h2>Log In</h2>
      <input type="text" v-model="user.name" placeholder="Name" required />
      <button type="submit">Log In</button>
      <p>Don't have an account? <a @click="toggleSignup">Sign up</a></p>
    </div>
    <div v-else-if="!isLoggedIn && isSigningUp">
      <h2>Sign Up</h2>
      <input type="text" v-model="user.name" placeholder="Name" required />
      <button type="submit">Sign Up</button>
      <p>Already have an account? <a @click="toggleSignup">Log in</a></p>
    </div>
    <div v-else>
      <h2>Welcome, {{ user.name }}</h2>
      <p>Profile Details:</p>
      <gender-picker v-model="user.gender"></gender-picker>
      <time-picker v-model="user.reminderTime"></time-picker>
      <color-picker v-model="user.favColor"></color-picker>
      <button type="submit">Save</button>
      <p>Not {{ user.name }}? <a @click="logout">Log out</a></p>
    </div>
  </form>
</template>

<script>
import GenderPicker from '../components/form/GenderPicker.vue'
import TimePicker from '../components/form/TimePicker.vue'
import ColorPicker from '../components/form/ColorPicker.vue'
import { mapActions, mapGetters } from 'vuex'

export default {
  components: {
    GenderPicker,
    TimePicker,
    ColorPicker
  },
  computed: {
    ...mapGetters('user', ['user', 'isLoggedIn'])
  },
  data() {
    return {
      user: {
        name: '',
        gender: '',
        reminderTime: '',
        favColor: ''
      },
      isSigningUp: false
    }
  },
  methods: {
    ...mapActions('user', ['login', 'signup', 'logout']),
    handleFormSubmit() {
      if (this.isLoggedIn) {
        // Handle saving the user profile data
        this.saveProfile()
      } else {
        // Handle login or signup based on the form input
        if (this.isSigningUp) {
          this.signup()
        } else {
          this.login()
        }
      }
    },
    saveProfile() {
      // Handle saving the user profile data
      // Dispatch an action from the user module to update the profile
      this.$store.dispatch('user/updateProfile', this.user)
    },
    toggleSignup() {
      this.isSigningUp = !this.isSigningUp
      // Reset form fields when toggling between sign up and login
      this.user.name = ''
      this.user.gender = ''
      this.user.reminderTime = ''
      this.user.favColor = ''
    }
  }
}
</script>

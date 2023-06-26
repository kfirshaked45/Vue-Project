<template>
  <form @submit.prevent="handleFormSubmit" class="container">
    <div v-if="!isLoggedIn && !isSigningUp" class="text-center">
      <h2 class="mb-4">Log In</h2>
      <div class="form-group">
        <input type="text" v-model="user.name" placeholder="Name" required class="form-control" />
      </div>
      <button type="submit" class="btn btn-primary btn-lg">Log In</button>
      <p class="mt-3">Don't have an account? <a @click="toggleSignup">Sign up</a></p>
    </div>
    <div v-else-if="!isLoggedIn && isSigningUp" class="text-center">
      <h2 class="mb-4">Sign Up</h2>
      <div class="form-group">
        <input type="text" v-model="user.name" placeholder="Name" required class="form-control" />
      </div>
      <button type="submit" class="btn btn-primary btn-lg">Sign Up</button>
      <p class="mt-3">Already have an account? <a @click="toggleSignup">Log in</a></p>
    </div>
    <div v-else class="text-center">
      <h2 class="mb-4">Welcome, {{ user.name }}</h2>
      <p class="lead">Profile Details:</p>
      <div class="form-group">
        <label for="gender" class="form-label">Gender:</label>
        <gender-picker v-model="user.gender" id="gender"></gender-picker>
      </div>
      <div class="form-group">
        <label for="reminder-time" class="form-label">Reminder Time:</label>
        <time-picker v-model="user.reminderTime" id="reminder-time"></time-picker>
      </div>
      <div class="form-group">
        <label for="fav-color" class="form-label">Favorite Color:</label>
        <color-picker v-model="user.favColor" id="fav-color"></color-picker>
      </div>
      <button type="submit" class="btn btn-primary btn-lg">Save</button>
      <p class="mt-3">Not {{ user.name }}? <a @click="logout">Log out</a></p>
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
    async handleFormSubmit() {
      if (this.isLoggedIn) {
        // Handle saving the user profile data
        this.saveProfile()
      } else {
        // Handle login or signup based on the form input
        if (this.isSigningUp) {
          await this.signup(this.user.name)
          // After signing up, automatically log in the user
          await this.login(this.user.name)
        } else {
          await this.login(this.user.name)
        }
      }
    },

    toggleSignup() {
      this.isSigningUp = !this.isSigningUp
      // Reset form fields when toggling between sign up and login
      this.user.name = ''
      this.user.gender = ''
      this.user.reminderTime = ''
      this.user.favColor = ''
    },

    saveProfile() {
      // Handle saving the user profile data
      // You can implement the logic to save the profile details
      // For example, you can call an API or dispatch an action to update the user's profile in the store
      // You can access the updated profile data in `this.user`
      console.log('Saving profile:', this.user)
    }
  }
}
</script>

<style>
.container {
  max-width: 400px;
  margin: 0 auto;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-label {
  font-weight: bold;
}

.btn-lg {
  padding: 0.75rem 1.5rem;
  font-size: 1.25rem;
}

.btn-primary {
  background-color: #007bff;
  border-color: #007bff;
}

.btn-primary:hover {
  background-color: #0069d9;
  border-color: #0062cc;
}

.btn-primary:focus {
  box-shadow: 0 0 0 0.2rem rgba(38, 143, 255, 0.5);
}

.lead {
  font-size: 1.25rem;
  font-weight: bold;
}

.mt-3 {
  margin-top: 1rem;
}

.text-center {
  text-align: center;
}
</style>

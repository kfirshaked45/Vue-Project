<template>
  <header class="app-header">
    <div class="header-text">
      <p>Digital Wallet</p>
      <p v-if="isLoggedIn">
        Welcome {{ currentUser.name }}! Your balance is {{ currentUser.balance }}. Current rate is:
        {{ rate }}
      </p>
    </div>
    <nav class="header-nav">
      <router-link to="/">Home</router-link>
      <router-link to="/contact">Contacts</router-link>
      <!-- <router-link to="/stats">Stats</router-link> -->
      <router-link to="/chatpop">Chatpop</router-link>
      <router-link to="/user">User</router-link>
    </nav>
  </header>
</template>

<script>
import { bitcoinService } from '../services/bitcoinService'
import { userService } from '../services/userService'

export default {
  data() {
    return {
      rate: null
    }
  },
  async created() {
    try {
      this.rate = await bitcoinService.getRate()
    } catch (error) {
      console.error('Error fetching rate:', error)
    }
  },
  computed: {
    currentUser() {
      return userService.getUser()
    },
    isLoggedIn() {
      return this.$store.getters['user/isLoggedIn']
    }
  }
}
</script>

<style lang="css" scoped>
p {
  margin: 0;
}
.app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.header-text {
  text-align: center;
  align-self: center;
}
.header-nav {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
}
.header-nav a {
  padding: 20px;
  text-decoration: none;
  color: inherit;
  border-bottom: 1px solid #ffffff;
}
.header-nav a:hover {
  border-bottom: 1px solid #ccc;
}
</style>

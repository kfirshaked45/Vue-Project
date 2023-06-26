<template>
  <header class="app-header">
    <div class="header-text">
      <h1>Digital Wallet</h1>
      <p v-if="currentUser">
        Welcome {{ currentUser.name }}! Your balance is {{ currentUser.balance }}. Current rate is:
        {{ rate }}
      </p>
    </div>
    <nav class="header-nav">
      <router-link to="/">Home</router-link>
      <router-link to="/contact">Contacts</router-link>
      <router-link to="/stats">Stats</router-link>
      <router-link to="/chatpop">Chatpop</router-link>
      <router-link to="/user">User</router-link>
    </nav>
  </header>
</template>

<script>
import { mapGetters } from 'vuex'
import { bitcoinService } from '../services/bitcoinService'

export default {
  computed: {
    ...mapGetters('user', ['user']),
    currentUser() {
      return this.user
    }
  },
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
  }
}
</script>

<style lang="css">
.header-nav {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
}
.header-nav a {
  border-bottom: 1px solid rgb(196, 194, 194);
  padding: 20px;
}
</style>

<template>
  <header class="app-header">
    <div class="header-text">
      <h1>Digital Wallet</h1>
      <p v-if="currentUser">
        Welcome {{ currentUser.name }}!, Your balance is {{ currentUser.balance }}, Current rate is:
        {{ rate }}
      </p>
    </div>
    <nav class="header-nav">
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/contact">Contacts</RouterLink>
    </nav>
  </header>
</template>

<script>
import { userService } from '../services/userService.js'
import { bitcoinService } from '../services/bitcoinService.js'
export default {
  data() {
    return {
      currentUser: null,
      rate: null
    }
  },
  async created() {
    try {
      this.currentUser = await userService.getUser()
      this.rate = await bitcoinService.getRate()
    } catch (error) {
      console.error('Error fetching user:', error)
    }
  }
}
</script>

<style lang="css">
.header-nav {
  display: flex;
  justify-content: space-evenly;
}
</style>

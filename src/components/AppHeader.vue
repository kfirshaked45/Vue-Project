<template>
  <header class="app-header">
    <div class="header-text">
      <h4 class="mb-0">Digital Wallet</h4>
      <p v-if="isLoggedIn" class="mb-0">
        Hi {{ currentUser.name }}! Balance: {{ currentUser.balance }}. Rate: {{ rate }}
      </p>
    </div>
    <nav class="header-nav">
      <router-link to="/" class="nav-link">Home</router-link>
      <router-link to="/contact" class="nav-link">Contacts</router-link>
      <!-- <router-link to="/stats" class="nav-link">Stats</router-link> -->
      <!-- <router-link to="/chatpop" class="nav-link">Chatpop</router-link> -->
      <router-link to="/user" class="nav-link">User</router-link>
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
      return this.$store.getters['user/user']
    },
    isLoggedIn() {
      return this.$store.getters['user/isLoggedIn']
    }
  }
}
</script>

<style lang="css" scoped>
h1 {
  margin: 0;
  font-size: 24px;
  font-weight: bold;
  color: #343a40;
}

p {
  margin: 0;
  font-size: 14px;
  color: #6c757d;
}

.app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #f8f9fa;
}

.header-text {
  text-align: center;
  align-self: center;
}

.header-nav {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.nav-link {
  padding: 0.5rem 1rem;
  text-decoration: none;
  color: #343a40;
  border-bottom: 2px solid transparent;
  transition: border-color 0.15s ease-in-out;
}

.nav-link:hover {
  border-color: #6c757d;
}

@media (max-width: 576px) {
  .app-header {
    flex-direction: column;
  }

  .header-text {
    margin-bottom: 0.5rem;
  }

  .header-nav {
    justify-content: center;
  }

  .nav-link {
    margin-right: 0.5rem;
    margin-bottom: 0.5rem;
  }
}
</style>

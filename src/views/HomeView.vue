<template>
  <main>
    <p class="home-text">
      Welcome to your digital wallet, the convenient and secure way to manage your currencies. Our
      digital wallet empowers you to seamlessly handle your digital assets, keep track of
      transactions, and stay in control of your finances.
    </p>
    <div v-if="isLoggedIn">
      <h2>Transaction History</h2>
      <ul>
        <li v-for="transaction in transactions" :key="transaction.timestamp">
          {{ transaction.amount }} BTC transferred to {{ transaction.to }}
        </li>
      </ul>
    </div>
    <div v-else>
      <p>Please log in or sign up to view your balance and transaction history.</p>
    </div>
  </main>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters('user', ['user', 'isLoggedIn', 'getTransactions'])
  }
}
</script>
<style scoped>
.home-text {
  font-size: 16px;
}
</style>

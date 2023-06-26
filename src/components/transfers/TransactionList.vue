<template>
  <div>
    <h2>Transaction History</h2>
    <ul>
      <li v-for="transaction in transactions" :key="transaction.timestamp">
        {{ transaction.amount }} BTC transferred to {{ transaction.to }}
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters('user', ['getTransactions'])
  },
  data() {
    return {
      transactions: []
    }
  },
  created() {
    this.transactions = this.getTransactions
  }
}
</script>

<template>
  <div>
    <h2>Transfer Funds</h2>
    <form @submit.prevent="transfer">
      <label>To:</label>
      <input type="text" v-model="recipient" required />
      <label>Amount:</label>
      <input type="number" v-model="amount" required />
      <button type="submit">Transfer</button>
    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      recipient: '',
      amount: null
    }
  },
  methods: {
    ...mapActions('user', ['transferFunds']),
    transfer() {
      console.log(this.user, 'USERRRR')
      this.transferFunds({ to: this.recipient, amount: this.amount })
      this.recipient = ''
      this.amount = null
    }
  }
}
</script>

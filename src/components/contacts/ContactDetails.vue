<template>
  <div class="section">
    <div class="top-section">
      <h2>Contact Details</h2>
      <button @click="goBack" class="back-btn">Back</button>
    </div>
    <div>
      <img :src="getAvatarURL(contact.email)" alt="Contact Avatar" class="avatar" />
      <div>
        <p>Name: {{ contact.name }}</p>
        <p>Email: {{ contact.email }}</p>
      </div>
    </div>

    <!-- Add TransferFunds component -->
    <TransferFunds v-if="isLoggedIn" :contact="contact" />

    <!-- Conditionally render TransactionList component -->
    <TransactionList v-if="isLoggedIn" :contactId="contact._id" />
  </div>
</template>

<script>
import { contactService } from '../../services/contactService'
import TransferFunds from '../transfers/TransferFunds.vue'
import TransactionList from '../transfers/TransactionList.vue'
import { mapGetters } from 'vuex'

export default {
  components: {
    TransferFunds,
    TransactionList
  },
  data() {
    return {
      contact: null
    }
  },
  computed: {
    ...mapGetters('user', ['isLoggedIn'])
  },
  created() {
    const contactId = this.$route.params.id
    this.fetchContact(contactId)
  },
  methods: {
    fetchContact(contactId) {
      contactService
        .getContactById(contactId)
        .then((contact) => {
          this.contact = contact
        })
        .catch((error) => {
          console.error('Error fetching contact:', error)
        })
    },
    getAvatarURL(email) {
      const hash = this.generateHash(email)
      return `https://robohash.org/${hash}.png`
    },
    generateHash(email) {
      let hash = 0
      for (let i = 0; i < email.length; i++) {
        hash = email.charCodeAt(i) + ((hash << 5) - hash)
      }
      return hash
    },
    goBack() {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped>
h2 {
  margin-bottom: 1rem;
}
.avatar {
  height: 100px;
}
.back-btn {
  border: none;
  cursor: pointer;
  height: 30px;
  border-radius: 3px;
  width: 50px;
  background-color: inherit;
  color: inherit;
  box-shadow: inset 0px 0px 0px 1px gray;
}
.top-section {
  display: flex;
  justify-content: space-between;
  width: 400px;
}
</style>

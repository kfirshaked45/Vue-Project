<template>
  <div>
    <h2>Contact Details</h2>
    <div>
      <img :src="getAvatarURL(contact.email)" alt="Contact Avatar" />
      <strong>Name:</strong> {{ contact.name }}
    </div>
    <div><strong>Email:</strong> {{ contact.email }}</div>
    <!-- Add more details here -->
    <button @click="goBack">Go Back</button>
  </div>
</template>

<script>
import { contactService } from '../../services/contactService'

export default {
  data() {
    return {
      contact: null
    }
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
      // Implement your own hash generation logic here, e.g., using a hashing library
      // For simplicity, we'll use a basic hash function that converts the email to a numerical hash
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
</style>

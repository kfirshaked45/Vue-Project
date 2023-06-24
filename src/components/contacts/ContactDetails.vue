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
    <!-- Add more details here -->
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

<template>
  <div class="section">
    <div class="top-section d-flex justify-content-between align-items-center mb-4">
      <h2 class="font-weight-bold">Contact Details</h2>
      <div>
        <button @click="saveContact" class="btn btn-primary">Save</button>
        <button @click="goBack" class="btn btn-outline-secondary">Back</button>
      </div>
    </div>
    <div class="d-flex align-items-center mb-4">
      <img
        :src="getAvatarURL(contact.email)"
        alt="Contact Avatar"
        class="avatar rounded-circle mr-3"
      />
      <div>
        <p class="mb-1"><strong>Name:</strong> {{ contact.name }}</p>
        <p class="mb-0"><strong>Email:</strong> {{ contact.email }}</p>
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
      contact: null,
      editedContact: {
        name: '',
        email: ''
      }
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
          // Clone the contact object to keep the original data
          this.editedContact = { ...contact }
        })
        .catch((error) => {
          console.error('Error fetching contact:', error)
        })
    },
    async saveContact() {
      try {
        // Call the saveContact action and pass the editedContact object
        await this.$store.dispatch('contact/saveContact', this.editedContact)
        // Handle successful save, e.g., show a success message
        this.goBack()
      } catch (error) {
        console.error('Error saving contact:', error)
        // Handle error, e.g., show an error message
      }
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

.btn-primary {
  background-color: #007bff;
  color: white;
}

.btn-outline-secondary {
  border-color: #6c757d;
  color: #6c757d;
}

.btn-outline-secondary:hover {
  background-color: #6c757d;
  color: white;
}

.rounded-circle {
  width: 100px;
  height: 100px;
}

.mb-0 {
  margin-bottom: 0;
}
</style>

<template>
  <div>
    <h1>Edit Contact</h1>
    <div v-if="contact">
      <p>Name: {{ contact.name }}</p>
      <p>Email: {{ contact.email }}</p>
      <!-- Add input fields for editing contact details -->
      <input v-model="editedContact.name" placeholder="Name" />
      <input v-model="editedContact.email" placeholder="Email" />

      <button @click="goBack">Back</button>
      <button v-if="isNewContact" @click="saveContact">Save</button>
      <button v-if="isNewContact" @click="cancelEdit">Cancel</button>
      <button v-else @click="deleteContact">Delete</button>
    </div>
    <div v-else>Loading...</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      contact: null,
      editedContact: {
        name: '',
        email: ''
      },
      isNewContact: false
    }
  },
  mounted() {
    const id = this.$route.params._id
    if (id) {
      // Fetch existing contact by ID from the store
      this.contact = this.$store.getters['contact/getContactById'](id)
      if (!this.contact) {
        // Contact not found in store, fetch from the server
        this.$store
          .dispatch('contact/loadContact', id)
          .then((contact) => {
            this.contact = contact
          })
          .catch((error) => {
            console.error(error)
            // Handle error, e.g., show an error message
          })
      }
    } else {
      // Create new empty contact
      this.contact = {
        name: '',
        email: ''
        // Add more contact fields as needed
      }
      this.isNewContact = true
    }
  },
  methods: {
    goBack() {
      this.$router.push('/contact')
    },
    saveContact() {
      // Call the contactService to save the contact
      this.$store
        .dispatch('contact/saveContact', this.editedContact)
        .then(() => {
          // Handle successful save, e.g., show a success message
          this.goBack()
        })
        .catch((error) => {
          console.error(error)
          // Handle error, e.g., show an error message
        })
    },
    cancelEdit() {
      this.goBack()
    },
    deleteContact() {
      // Call the contactService to delete the contact
      this.$store
        .dispatch('contact/deleteContact', this.contact._id)
        .then(() => {
          // Handle successful deletion, e.g., show a success message
          this.goBack()
        })
        .catch((error) => {
          console.error(error)
          // Handle error, e.g., show an error message
        })
    }
  }
}
</script>

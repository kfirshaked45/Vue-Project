<template>
  <div class="edit-contact">
    <h1 class="mb-4">Edit Contact</h1>
    <div v-if="contact" class="contact-details">
      <div class="form-group">
        <label for="name">Name</label>
        <input id="name" v-model="editedContact.name" class="form-control" placeholder="Name" />
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input id="email" v-model="editedContact.email" class="form-control" placeholder="Email" />
      </div>

      <div class="buttons">
        <button @click="goBack" class="btn btn-secondary mr-2">Back</button>
        <button @click="saveContact" class="btn btn-primary mr-2">Save</button>
        <button @click="deleteContact" class="btn btn-danger">Delete</button>
      </div>
    </div>
    <div v-else class="loading">Loading...</div>
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

<style scoped>
.edit-contact {
  max-width: 400px;
  margin: auto;
  padding: 2rem;
}

.edit-contact h1 {
  margin-bottom: 2rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.buttons {
  display: flex;
  justify-content: flex-end;
}

.loading {
  margin-top: 2rem;
  text-align: center;
}
</style>

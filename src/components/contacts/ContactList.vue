<template>
  <div>
    <h2>Contact List</h2>
    <ul>
      <li v-for="contact in contacts" :key="contact._id">
        <router-link :to="'/contact/' + contact._id" class="link">
          <strong>{{ contact.name }}</strong> - {{ contact.email }}
        </router-link>
        <button @click="deleteContact(contact._id)" class="delete-btn">Delete</button>
      </li>
    </ul>
  </div>
</template>

<script>
import { contactService } from '../../services/contactService'

export default {
  props: {
    contacts: {
      type: Array,
      required: true
    }
  },
  methods: {
    deleteContact(contactId) {
      contactService
        .deleteContact(contactId)
        .then(() => {
          // Emit the contactDeleted event with the contactId
          this.$emit('contactDeleted', contactId)
        })
        .catch((error) => {
          console.error('Error deleting contact:', error)
        })
    }
  }
}
</script>

<style scoped>
h2 {
  margin-bottom: 1rem;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin-bottom: 0.5rem;
}
.link {
  margin-right: 10px;
}
.delete-btn {
  border: none;
  border-radius: 5px;
  height: 30px;
  cursor: pointer;
}
</style>

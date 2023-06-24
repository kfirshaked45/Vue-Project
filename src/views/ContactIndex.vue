<template>
  <div>
    <ContactList :contacts="contacts" @contactDeleted="handleContactDeleted" />
    <p>HEREEEEEEEEE</p>
  </div>
</template>

<script>
import { contactService } from '../services/contactService.js'
import ContactList from '../components/contacts/ContactList.vue'

export default {
  components: {
    ContactList
  },
  data() {
    return {
      contacts: null
    }
  },
  async created() {
    try {
      this.contacts = await contactService.getContacts()
    } catch (error) {
      console.error('Error fetching contacts:', error)
    }
  },
  methods: {
    handleContactDeleted(contactId) {
      // Remove the deleted contact from the contacts array
      this.contacts = this.contacts.filter((contact) => contact._id !== contactId)
    }
  }
}
</script>

<style lang="scss"></style>

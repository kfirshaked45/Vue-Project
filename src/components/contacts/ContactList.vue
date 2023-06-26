<template>
  <div>
    <h2>Contacts</h2>
    <table class="table table-bordered">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="contact in contacts" :key="contact._id">
          <td>{{ contact.name }}</td>
          <td>{{ contact.email }}</td>
          <td>
            <router-link :to="`/contact/${contact._id}`" class="btn btn-primary mr-2"
              >View</router-link
            >
            <router-link :to="`/contact/edit/${contact._id}`" class="btn btn-info mr-2"
              >Edit</router-link
            >
            <button @click="deleteContact(contact._id)" class="btn btn-danger">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  computed: {
    ...mapState('contact', ['contacts'])
  },
  methods: {
    ...mapActions('contact', ['deleteContact']),
    async loadContacts() {
      await this.$store.dispatch('contact/loadContacts')
    }
  },
  created() {
    this.loadContacts()
  }
}
</script>

<style scoped>
h2 {
  margin-bottom: 1rem;
}
</style>

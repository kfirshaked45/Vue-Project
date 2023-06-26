<template>
  <div>
    <h2>Contact List</h2>
    <ul class="list-container">
      <li v-for="contact in contacts" :key="contact._id">
        <router-link :to="'/contact/' + contact._id" class="link">
          <strong>{{ contact.name }}</strong> - {{ contact.email }}
        </router-link>
        <router-link :to="'/contact/edit/' + contact._id" class="edit-btn">Edit</router-link>
        <button @click="deleteContact(contact._id)" class="delete-btn">Delete</button>
      </li>
    </ul>
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
  margin-inline-end: 10px;
}
.edit-btn {
  color: black;
}
.list-container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}
</style>

import { createRouter, createWebHistory } from 'vue-router'
import ContactIndex from '../views/ContactIndex.vue'
import Stats from '../views/Stats.vue'
import ContactDetails from '../components/contacts/ContactDetails.vue'
import ContactEdit from '../components/contacts/ContactEdit.vue'
import PopChatView from '../views/PopChatView.vue'
import HomeView from '../views/HomeView.vue'
import UserProfile from '../views/UserProfile.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/contact',
      name: 'contact',
      component: ContactIndex
    },

    {
      path: '/contact/:id',
      name: 'ContactDetails',
      component: ContactDetails
    },
    {
      path: '/stats',
      name: 'Stats',
      component: Stats
    },
    {
      path: '/chatpop',
      name: 'chatpop',
      component: PopChatView
    },
    {
      path: '/user',
      name: 'user',
      component: UserProfile
    },
    {
      path: '/contact/edit/:_id?',
      name: 'ContactEdit',
      component: ContactEdit
    }
  ]
})

export default router

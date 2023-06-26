import { createStore } from 'vuex'
import { contactService } from './services/contactService'
import { userService } from './services/userService'

export default createStore({
  modules: {
    contact: {
      namespaced: true,
      state: {
        contacts: []
      },
      mutations: {
        setContacts(state, contacts) {
          state.contacts = contacts
        }
      },
      actions: {
        async loadContacts({ commit }) {
          try {
            const contacts = await contactService.getContacts()
            commit('setContacts', contacts)
          } catch (error) {
            console.error('Error loading contacts:', error)
          }
        },
        async deleteContact({ commit }, contactId) {
          try {
            await contactService.deleteContact(contactId)
            commit('setContacts', [])
            await commit('setContacts', await contactService.getContacts())
          } catch (error) {
            console.error('Error deleting contact:', error)
          }
        }
      },
      getters: {
        contacts: (state) => state.contacts,
        getContactById: (state) => (id) => {
          return state.contacts.find((contact) => contact._id === id)
        }
      }
    },
    user: {
      namespaced: true,
      state: {
        user: null,
        isLoggedIn: false
      },
      mutations: {
        setUser(state, user) {
          state.user = user
        },
        setLoggedIn(state, isLoggedIn) {
          state.isLoggedIn = isLoggedIn
        },
        setTransactions(state, transactions) {
          state.user.transactions = transactions
        }
      },
      actions: {
        async login({ commit }, username) {
          try {
            await userService.login(username)
            const user = userService.getUser()
            commit('setUser', user)
            commit('setLoggedIn', true)
          } catch (error) {
            console.error('Error logging in:', error)
          }
        },
        async signup({ commit }, username) {
          try {
            await userService.signup(username)
            const user = userService.getUser()
            commit('setUser', user)
            commit('setLoggedIn', true)
          } catch (error) {
            console.error('Error signing up:', error)
          }
        },
        async logout({ commit }) {
          try {
            await userService.logout()
            commit('setUser', null)
            commit('setLoggedIn', false)
          } catch (error) {
            console.error('Error logging out:', error)
          }
        },
        async updateProfile({ commit }, userProfile) {
          try {
            // Perform the API call or database update to save the user profile data
            // For example:
            await userService.updateUserProfile(userProfile)

            // Commit a mutation to update the user state in the store
            commit('setUser', userProfile)
          } catch (error) {
            console.error('Error updating user profile:', error)
          }
        },
        async transferFunds({ commit }, { to, amount }) {
          try {
            await userService.transferFunds(to, amount)
            const transactions = userService.getTransactions()
            commit('setTransactions', transactions)
          } catch (error) {
            console.error('Error transferring funds:', error)
          }
        },
        async getTransactions({ commit }) {
          try {
            const transactions = userService.getTransactions()
            commit('setTransactions', transactions)
          } catch (error) {
            console.error('Error getting transactions:', error)
          }
        }
      },
      getters: {
        user: (state) => state.user,
        isLoggedIn: (state) => state.isLoggedIn,
        getTransactions: (state) => state.user.transactions
      }
    }
  }
})

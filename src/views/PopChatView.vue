<template>
  <div>
    <popup-component>
      <template v-slot:header>
        <h2>Chat App</h2>
      </template>
      <chat-app></chat-app>
      <template v-slot:footer>
        <p>Popup Footer</p>
      </template>
    </popup-component>
  </div>
</template>

<script>
import PopupComponent from '../components/PopUp.vue'
import ChatApp from '../components/ChatApp.vue'

export default {
  components: {
    PopupComponent,
    ChatApp
  }
}
</script>

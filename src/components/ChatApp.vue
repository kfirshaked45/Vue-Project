<template>
  <div>
    <button @click="openPopup" class="chat-icon">Chat</button>
    <div v-if="showPopup" class="popup">
      <div class="popup-header">
        <slot name="header"></slot>
      </div>
      <div class="popup-content">
        <div class="message-list">
          <div v-for="message in messages" :key="message.id" class="message">
            <p>{{ message.text }}</p>
            <span class="timestamp">{{ message.timestamp }}</span>
          </div>
        </div>
        <div class="message-input">
          <input
            v-model="inputText"
            @keydown.enter="sendMessage"
            placeholder="Type your message..."
          />
          <button @click="sendMessage">Send</button>
        </div>
      </div>
      <div class="popup-footer">
        <slot name="footer"></slot>
      </div>
      <button @click="closePopup" class="close-btn">Close</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showPopup: false,
      messages: [],
      inputText: ''
    }
  },
  mounted() {
    document.addEventListener('keydown', this.onEscPress)
  },
  beforeUnmount() {
    document.removeEventListener('keydown', this.onEscPress)
  },
  methods: {
    openPopup() {
      this.showPopup = true
    },
    closePopup() {
      this.showPopup = false
    },
    onEscPress(event) {
      if (event.key === 'Escape') {
        this.closePopup()
      }
    },
    sendMessage() {
      if (this.inputText.trim() !== '') {
        const message = {
          id: Date.now(),
          text: this.inputText,
          timestamp: new Date().toLocaleTimeString()
        }
        this.messages.push(message)
        this.inputText = ''
        this.autoRespond()
      }
    },
    autoRespond() {
      setTimeout(() => {
        const response = {
          id: Date.now(),
          text: 'Auto response: Thanks for your message!',
          timestamp: new Date().toLocaleTimeString()
        }
        this.messages.push(response)
      }, 1000)
    }
  }
}
</script>

<style>
.popup {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  border: 1px solid #ccc;
  padding: 20px;
  color: black;
  width: 300px;
}

.popup-header {
  text-align: center;
  margin-bottom: 10px;
}

.popup-content {
  margin-bottom: 20px;
}

.message-list {
  max-height: 200px;
  overflow-y: auto;
}

.message {
  margin-bottom: 10px;
}

.timestamp {
  color: #888;
  font-size: 0.8em;
}

.message-input {
  display: flex;
}

.message-input input {
  flex-grow: 1;
  padding: 5px;
}

.message-input button {
  padding: 5px 10px;
  margin-left: 10px;
}

.close-btn {
  margin-top: 20px;
}

.chat-icon {
  position: fixed;
  bottom: 20px;
  right: 20px;
  padding: 10px;
  background-color: #333;
  color: white;
  border: none;
  cursor: pointer;
}
</style>

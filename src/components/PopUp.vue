<template>
  <div>
    <button @click="openPopup" class="chat-icon">Chat</button>
    <div v-if="showPopup" class="popup">
      <div class="popup-header">
        <slot name="header"></slot>
      </div>
      <div class="popup-content">
        <slot></slot>
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
      showPopup: false
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
}

.popup-header {
  text-align: center;
  margin-bottom: 10px;
}

.popup-footer {
  text-align: center;
  margin-top: 10px;
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

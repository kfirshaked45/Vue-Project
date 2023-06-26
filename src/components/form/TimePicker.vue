<template>
  <div>
    <label for="reminder-time">Reminder Time:</label>
    <input type="time" id="reminder-time" :value="value" @input="updateTime($event.target.value)" />
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      required: true
    }
  },
  methods: {
    updateTime(newValue) {
      this.$emit('input', newValue)
    }
  }
}
</script>

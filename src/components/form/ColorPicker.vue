<template>
  <div>
    <label for="favorite-color">Favorite Color:</label>
    <input
      type="color"
      id="favorite-color"
      :value="value"
      @input="updateColor($event.target.value)"
    />
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
    updateColor(newValue) {
      this.$emit('input', newValue)
    }
  }
}
</script>

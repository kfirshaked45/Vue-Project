<template>
  <div>
    <label for="gender">Gender:</label>
    <select id="gender" v-model="selectedGender">
      <option value="male">Male</option>
      <option value="female">Female</option>
      <option value="not_say">I'd rather not say</option>
    </select>
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
  computed: {
    selectedGender: {
      get() {
        return this.value
      },
      set(newValue) {
        this.$emit('input', newValue)
      }
    }
  }
}
</script>

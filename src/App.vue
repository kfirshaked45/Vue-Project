<script>
import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue'
export default {
  components: {
    AppHeader,
    AppFooter
  }
}
</script>

<template>
  <AppHeader />
  <div class="main-content">
    <RouterView />
  </div>
  <AppFooter />
</template>

<style>
/* .main-page {
  display: flex;
} */
.main-content {
  margin-block-start: 50px;
}
</style>

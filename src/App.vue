<script>
import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue'
import PopChatView from './views/PopChatView.vue'
export default {
  components: {
    AppHeader,
    AppFooter,
    PopChatView
  }
}
</script>

<template>
  <AppHeader />
  <div class="main-content">
    <RouterView />
    <PopChatView />
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

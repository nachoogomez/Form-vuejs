<script setup lang="ts">
import {RouterView } from 'vue-router'
</script>

<template>
  <RouterView />
</template>

<style scoped>
.wrapper {
  display: flex;
  justify-content: center;
}

nav {
  display: flex;
  gap: 1rem;
  position: fixed;
  top: 0;
}

nav a {
  color: #ffffff;
  font-weight: 500;
  font-size: 1.3rem;
}
</style>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/login">Login Form</RouterLink>
      </nav>
    </div>
  </header>

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

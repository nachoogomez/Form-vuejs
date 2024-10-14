<script setup lang="ts">
import type { User } from '@/models/userModel';
import { useUserStore } from '../stores/userStore'
import { useAuthStore } from '../stores/authStore'
import { reactive } from 'vue';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

const user: User = reactive<User>(useUserStore().user);

function logout () {
  authStore.logout().then(() => router.push('/login'));
}

</script>

<template>
  <main>
    <h2>Bienvenido {{ user.username }}</h2>
    <button @click="logout">Salir</button>
  </main>
</template>

<style scoped>
h2 {
  text-align: center;
  font-size: 1.5rem;
  color: #ffffff;
}

button{
  width: 100%;
  height: 50px;
  border-radius: 15px;
  border: none;
  outline: none;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  font-size: 1.2em;
  font-weight: 600;
  color: #333;
}
</style>

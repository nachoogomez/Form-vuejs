<script setup lang="ts">
import { useUserStore } from '../stores/userStore'
import { useAuthStore } from '../stores/authStore'
import { useSesionStore } from '@/stores/sesionSore';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();
const userStore = useUserStore();
const sesionStore = useSesionStore();

const user = userStore.user
const sesionData = sesionStore.data



function logout () {
  authStore.logout().then(() => router.push('/login'));
}

function getUserRole(isAdmin: boolean | undefined): string{
  return isAdmin ? 'Administrador' : 'Usuario'
}

</script>

<template>
  <main>
    <div class="wrapper">
      <h2>Bienvenido {{ user?.firstName }}</h2>
      <div class="divider"></div>
      <p>Nombre: {{ user?.firstName }} {{ user?.lastName }}</p>
      <p>Rol: {{ getUserRole(user?.isAdmin) }}</p> 
      <div class="divider"></div>
      <h2>Informacion de sesion:</h2>
      <p>JWT Payload: {{ sesionData?.tokenPayload}}</p>
      <p>JWT creado a las: {{ sesionData?.createdAt.toLocaleString() }}</p>
      <p>JWT se refrescara a las: {{ sesionData?.refreshedAt.toLocaleString() }}</p>
      <p>JWT expira a las: {{ sesionData?.expiresAt.toLocaleString() }}</p>
      <div class="divider"></div>
      <h2>Lista de usuarios:</h2>
      <p>Nacho</p>
      <div class="btns">
        <button v-if="user?.isAdmin">Agregar nuevo</button>
        <div class="divider"></div>
        <button @click="logout">Salir</button>
      </div>
        
    </div>
  </main>
</template>

<style scoped>
.wrapper {
  width: auto;
  background: transparent;
  border: 2px solid rgba(255, 255, 255, 0.2);
  color: #fff;
  padding: 30px 40px;
  border-radius: 15px;
}

.divider{
  width: 100%;
  height: 1px;
  background-color: rgba(255, 255, 255, 0.2);
  margin: 20px 0;
}

h2 {
  font-size: 1.5rem;
  color: #ffffff;
}

p{
  font-size: 1.2rem;
}

.btns{
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top: 20px;
}

button{
  width: 80%;
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

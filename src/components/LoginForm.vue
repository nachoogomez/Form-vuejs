<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/authStore'
import { Form, Field } from 'vee-validate';
import * as yup from 'yup';

const router = useRouter()
const authStore = useAuthStore()

const schema = yup.object().shape({
  username: yup.string().required('El nombre de usuario es requerido'),
  password: yup.string().required('La contraseña es requerida'),
  rememberMe: yup.boolean()
})

if(authStore.auth.data){
  router.push('/')
}


function handleSubmit (values: any, {setErrors}: any)  {
  const {username, password} = values;
  return authStore.login(username, password).then(() => {
    router.push('/')
  }).catch(error => setErrors({apiError: error}))
}
</script>

<template>
  <main>
    <div class="wrapper">
      <Form @submit="handleSubmit" :validation-schema="schema" v-slot="{errors, isSubmitting}">
        <h1>Login</h1>
        <div class="input-bx">
          <Field
            name="username"
            type="text"
            placeholder="Usuario"
            id="username"
            :class="{'isInvalid': errors.username || errors.apiError }"
            required
          />
          <ion-icon class="icon" name="person-circle"></ion-icon>
        </div>
        <div class="input-bx">
          <Field
            name="password"
            :class="{'isInvalid': errors.password || errors.apiError }"
            type="password"
            placeholder="Contraseña"    
            id="password"
            required
          />
          <ion-icon class="icon" name="lock-closed"></ion-icon>
          <div class="invalid-feedback">{{ errors.password }}</div>
        </div>
        <div class="remember-forgot">
          <label
            ><input type="checkbox" name="remember" id="rememberMe" />
            Recordarme</label
          >
          <a href="#">Olvidaste tu contraseña</a>
        </div>
        <button type="submit" class="btn" >
          <span v-show="isSubmitting" class="loader" ></span>
          <p v-show="!isSubmitting">Ingresar</p>
        </button>
        <div v-if="errors.apiError" class="invalid-feedback">{{ errors.apiError }}</div>
      </Form>
    </div>
  </main>
</template>

<style scoped>
.wrapper {
  width: 400px;
  background: transparent;
  border: 2px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(20px);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  color: #fff;
  padding: 30px 40px;
  border-radius: 15px;
}

.wrapper h1 {
  font-size: 3em;
  text-align: center;
}

.wrapper .input-bx {
  position: relative;
  width: 100%;
  height: 50px;
  margin: 30px 0;
}

.wrapper .input-bx input {
  width: 100%;
  height: 100%;
  background: transparent;
  border: none;
  outline: none;
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 15px;
  color: #fff;
  padding: 20px 45px 20px 20px;
}

.input-bx input.isInvalid {
  color: #dc3545;
  border-color: 2px solid #dc3545;
  background: rgba(250, 150, 150, 0.2);
}

.wrapper .input-bx input::placeholder {
  color: #fff;
}

.wrapper .input-bx input.isInvalid::placeholder {
  color: #dc3545;
}

.invalid-feedback {
  padding: 0px 16px;
  margin: 0px;
  color: #dc3545;
  font-weight: 600;
  font-size: 0.8em;
}

.wrapper .input-bx .icon {
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1.5em;
}

.wrapper .remember-forgot {
  display: flex;
  justify-content: space-between;
  font-size: 1.2em;
  margin: -15px 0 15px;
}

.wrapper .remember-forgot label input {
  accent-color: #fff;
  margin-right: 3px;
}

.wrapper .remember-forgot a {
  color: #fff;
  text-decoration: none;
}

.wrapper .remember-forgot a:hover {
  text-decoration: underline;
}

.wrapper button {
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

.btn p{
  font-size: 1.2em;
  font-weight: 600;
  color: #333;
}

.loader{
  margin: auto;
  width: 24px;
  height: 24px;
  border: 3px solid #fff;
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotate 1s linear infinite ;
}

@keyframes rotate {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

</style>

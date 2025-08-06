<template>
  <h1>Login</h1>
  <form @submit.prevent="login">
    <input v-model="user" placeholder="username" />
    <button type="submit">Entrar</button>
  </form>
</template>

<script setup>
import { ref } from 'vue'
const user = ref('')
const login = () => {
  localStorage.setItem('user', user.value)
  location.href = '/dashboard'
}
</script>

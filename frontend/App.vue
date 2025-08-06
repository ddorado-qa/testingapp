<template>
  <div class="layout">
    <aside>
      <h2>QA App</h2>
      <nav>
        <router-link to="/dashboard" v-if="isLogged">Dashboard</router-link>
        <router-link to="/users" v-if="isLogged">Usuarios</router-link>
        <router-link to="/products" v-if="isLogged">Productos</router-link>
        <router-link to="/logs" v-if="isLogged">Logs</router-link>
        <router-link to="/settings" v-if="isLogged">Settings</router-link>
        <router-link to="/support" v-if="isLogged">Soporte</router-link>
        <router-link to="/rating" v-if="isLogged">Rating</router-link>
        <router-link to="/login" v-if="!isLogged">Login</router-link>
        <a href="#" v-if="isLogged" @click="logout">Logout</a>
      </nav>
    </aside>
    <main>
      <router-view />
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
const isLogged = computed(() => !!localStorage.getItem('user'))
const logout = () => {
  localStorage.removeItem('user')
  location.href = '/login'
}
</script>

<style>
.layout {
  display: flex;
}
aside {
  width: 200px;
  padding: 1rem;
  background: #eee;
  min-height: 100vh;
}
nav a {
  display: block;
  margin: 0.5rem 0;
}
main {
  flex: 1;
  padding: 1rem;
}
</style>

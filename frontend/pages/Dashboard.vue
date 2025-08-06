<template>
  <h1>Dashboard</h1>
  <p>Bienvenido, {{ user }}</p>
</template>

<script setup>
const user = localStorage.getItem('user') || 'Guest'
</script>

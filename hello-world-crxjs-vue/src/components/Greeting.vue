<template>
    <p>Hello, {{ name }}</p>
    <input v-model="name">
</template>

<script setup lang="ts">
const name = defineModel()
</script>

<style scoped>
p {
    color: orange;
}
</style>
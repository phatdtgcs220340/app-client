<script setup lang="ts">
    import { reactive } from 'vue';
    import { getUserDetails } from '../../utils/userdetails';
    const user = reactive({
        fullName: '',
        username: ''
    })
    const getUser = getUserDetails;
    getUser(user)
</script>
<template>
    <div class="px-2 py-4">
        <h1 class="mb-4
            text-3xl font-medium text-gray-700">💕😘 Hello {{ user.fullName }}</h1>
        <h1 class="text-2xl font-medium text-gray-700">🌠🌠 Welcome to Password Manager</h1>
    </div>
</template>
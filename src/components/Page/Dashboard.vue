<script setup lang="ts">
    import { onMounted, reactive, ref } from 'vue';
    import { getUserDetails } from '../../api/get/userdetails';
    import { getAccessToken } from '../../env';
    import LoadingPage from './LoadingPage.vue';
    const user =  reactive({
        username: '',
        fullName: ''
    })
    const loadCompleted = ref(true);
    onMounted(async () => {
        const token = getAccessToken();
        if (token !== undefined) {
            loadCompleted.value = false;
            try {
            const { fullName, username } = await getUserDetails();
            user.fullName = fullName;
            user.username = username;
            } catch (error) {
            console.error('Error fetching user details:', error);
            } finally {
            loadCompleted.value = true;
            }
        }
    });
</script>
<template>
    <div class="p-4 pt-8 sm:ml-64">
        <div class="p-2 border-2 border-gray-200 border-dashed rounded-lg ">
            <div v-if="loadCompleted" class="px-2 py-4 bg-gray-100 rounded-lg">
                <h1 class="mb-4
                    text-3xl font-medium text-gray-700">💕😘 Hello {{ user.fullName }}</h1>
                <h1 class="text-2xl font-medium text-gray-700">🌠🌠 Welcome to Password Manager</h1>
            </div>
            <LoadingPage v-else class="px-2 py-4 bg-gray-100 rounded-lg"/>
        </div>
    </div>  
</template>

<script setup lang="ts">
import { ref } from 'vue';

    defineProps({
        id: String,
        username: String,
        password: String,
        application: String,
        type : String,
        dateAudit: String
    })
    const hided = ref(false);
</script>
<template>
    <div class="px-4 py-2">
        <h1 class="mb-2
            text-2xl font-semibold">
            {{ application != undefined ? application : 'Dummy' }}</h1>
        <div class="text-gray-800">
            <h1 class="mb-1 px-2 font-semibold">
                Username
            </h1>
            <h1
                class="bg-white w-fit px-2 py-1 rounded-lg border-b text-sm"
            >
                {{ username != undefined ? username : 'dummyaccount' }}
            </h1>
            <h1 class="mb-1 px-2 font-semibold">
                Password
            </h1>
            <div class="flex">
                <input disabled type="text" :value="hided ? password : '•••••••'"
                    class="bg-white w-fit mr-2 px-2 py-1 rounded-lg border-b cursor-text text-sm">
                <button @click="() => hided = !hided"
                    class="text-gray-500 hover:text-gray-800">
                    <svg v-show="!hided" xmlns="http://www.w3.org/2000/svg" width="1.2rem" height="1.2rem" viewBox="0 0 15 15">
                        <path fill="currentColor" fill-rule="evenodd" d="M11 3.5V6h1.5A1.5 1.5 0 0 1 14 7.5v6a1.5 1.5 0 0 1-1.5 1.5h-10A1.5 1.5 0 0 1 1 13.5v-6A1.5 1.5 0 0 1 2.5 6H4V3.5a3.5 3.5 0 1 1 7 0m-6 0a2.5 2.5 0 0 1 5 0V6H5z" clip-rule="evenodd" />
                    </svg>
                    <svg v-show="hided" xmlns="http://www.w3.org/2000/svg" width="1.2rem" height="1.2rem" viewBox="0 0 15 15">
                        <path fill="currentColor" d="M5 3.5a2.5 2.5 0 0 1 5 0V4h1v-.5a3.5 3.5 0 1 0-7 0V6H2.5A1.5 1.5 0 0 0 1 7.5v6A1.5 1.5 0 0 0 2.5 15h10a1.5 1.5 0 0 0 1.5-1.5v-6A1.5 1.5 0 0 0 12.5 6H5z" />
                    </svg>
                </button>
            </div>
        </div>
    </div>
</template>
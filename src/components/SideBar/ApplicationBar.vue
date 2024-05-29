<script setup lang="ts">
    const emit = defineEmits(['openAccount'])
    defineProps({
        applicationId: String, 
        application: String
    })
</script>
<template>
    <div @click="$emit('openAccount')"
        class="ml-6 mb-2 px-4 py-2 cursor-pointer rounded-lg border-b 
            flex items-center gap-2
            text-gray-800 text-sm font-medium
            hover:bg-gray-100">
            <svg xmlns="http://www.w3.org/2000/svg" width="1.2rem" height="1.2rem" viewBox="0 0 16 16">
                <circle cx="8" cy="8" r="4" fill="currentColor" />
            </svg>
        {{ application }}
    </div>
</template>
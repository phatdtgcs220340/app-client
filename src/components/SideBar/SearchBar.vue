<script setup lang="ts">
import { ref } from 'vue';

    defineEmits(['search'])
    const appInput = ref('');
</script>
<template>
    <div class="ml-2 my-2 flex items-center justify-center border-b border-gray-100 rounded-lg
                text-gray-500">
        <svg xmlns="http://www.w3.org/2000/svg" width="1.2rem" height="1.2rem" viewBox="0 0 24 24">
		    <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="m21 21l-4.343-4.343m0 0A8 8 0 1 0 5.343 5.343a8 8 0 0 0 11.314 11.314" />
	    </svg>
        <input 
            @input="$emit('search', appInput)"
            v-model="appInput"
            class="ml-1 py-2 rounded-lg focus:outline-none
                text-sm text-gray-800 font-medium"
            type="text">
    </div>
</template>
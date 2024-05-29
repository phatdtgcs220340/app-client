<script setup lang="ts">
    defineProps({
        applicationId: String, 
        application: String
    })
</script>
<template>
    <div 
        class="mx-6 px-4 py-2 cursor-pointer rounded-lg border-b 
            flex items-baseline gap-2
            text-gray-800
            hover:bg-gray-100">
            <svg class="text-gray-500"
                height="8px" width="8px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
                    viewBox="0 0 31.955 31.955">
                    <path d="M27.25,4.655C20.996-1.571,10.88-1.546,4.656,4.706C-1.571,10.96-1.548,21.076,4.705,27.3
                        c6.256,6.226,16.374,6.203,22.597-0.051C33.526,20.995,33.505,10.878,27.25,4.655z"/>
            </svg>
        {{ application }}
    </div>
</template>
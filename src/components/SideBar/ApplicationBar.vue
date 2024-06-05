<script setup lang="ts">
    import { typeMap } from '../../mapper/type';
    const emit = defineEmits(['openAccount'])
    defineProps({
        applicationId: String, 
        application: String,
        type : String
    })
</script>
<template>
    <div @click="$emit('openAccount')"
        class="ml-6 mb-2 px-4 py-2 cursor-pointer rounded-lg border-b 
            flex items-center gap-2
            text-gray-800 text-sm font-medium
            hover:bg-gray-100">
            {{ typeMap(type) }}
        {{ application }}
    </div>
</template>
<script setup lang="ts">
    import { reactive } from 'vue';
    import { useRouter } from 'vue-router';
    import { register } from '../../logic/register';
    import Spinner from '../Spinner/Spinner.vue';
    const router = useRouter();
    const registerForm = reactive({
        fullName: '',
        username: '',
        password: '',
        loaded: true
    })
    
    async function doRegister() {
        registerForm.loaded = false;
        await register(registerForm)
        registerForm.loaded = true;
    }
</script>
<template>
    <div class="flex justify-center items-center h-screen z-100">
        <form @submit.prevent="doRegister"
        class="flex flex-col w-1/4 p-6 rounded-lg bg-white shadow-md place-content-start">
            <label class="text-sm text-gray-600 mb-1"
                >Full name</label>
            <input 
                required 
                class="mb-1 px-2 py-1 rounded-md bg-gray-100 border border-gray-200
                    focus:outline-none text-sm" 
                v-model="registerForm.fullName">
            <label class="text-sm text-gray-600 mb-1"
                >Username</label>
            <input 
                required 
                type="email"
                class="mb-1 px-2 py-1 rounded-md bg-gray-100 border border-gray-200
                    focus:outline-none text-sm" 
                v-model="registerForm.username">
            <label class="text-sm text-gray-600 text-gray-600 mb-1">Password</label>
            <input 
                required 
                class="mb-2 px-2 py-1 rounded-md bg-gray-100 border border-gray-200
                    focus:outline-none text-sm"
                type="password" 
                v-model="registerForm.password">
            <button class="bg-gray-100 py-1 rounded-md shadow-md mb-2
                           text-lg font-semibold text-gray-600 text-center
                           flex justify-center items-center h-[32px]
                           hover:bg-gray-600 hover:text-gray-100">
                <template v-if="registerForm.loaded">Sign up</template>
                <template v-else><Spinner class="text-center"/></template>
            </button>
            <div class="text-sm text-gray-600 select-none">
                Already have an account? <span 
                    @click="() => router.replace({ path : '/login' })"
                    class="cursor-pointer
                        underline underline-offset-2
                        hover:font-medium">
                    Sign in</span>
            </div>
        </form>
    </div>
</template>
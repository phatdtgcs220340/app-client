<script setup lang="ts">
    import { reactive, ref } from 'vue';
    import axios from 'axios';
    import Spinner from '../Spinner/Spinner.vue';
    const redirectURI = "http://localhost:5173/authorized"
    const authServer = "http://127.0.0.1:9000"
    const authorziationURL = `${authServer}/oauth2/authorize?response_type=code&client_id=client&scope=openid&redirect_uri=${redirectURI}`
    const header = {
        headers : {
            'Content-type' : 'application/x-www-form-urlencoded'
        }
    }
    interface Form {
        username : string,
        password: string
    }
    const loginForm = reactive({
        username: '',
        password: ''
    })
    const loadCompleted = ref(true);
    async function login(form : Form) {
        loadCompleted.value = false;
        await axios.post(`${authServer}/login`, {
            username: form.username,
            password: form.password
        }, header)
        .then((response1) => {
            console.log("log: ")
            console.log(response1.headers)
        })
        .catch((error) => {
            console.log(error)
        })
        .finally(() => { 
            loadCompleted.value = true;
        })
    }
</script>
<template>
    <div class="bg-gray-500 flex justify-center items-center h-screen z-100">
        <form @submit.prevent="login(loginForm)" 
        class="grid grid-cols-3 w-fit p-6 rounded-lg bg-white shadow-md place-content-start">
            <label class="font-medium text-gray-600 text-lg"
                >Username</label>
            <input 
                required 
                class="col-span-2 mb-4 px-2 py-1 rounded-md bg-gray-100 border border-gray-200
                    focus:outline-none" 
                v-model="loginForm.username">
            <label class="font-medium text-gray-600 text-lg">Password</label>
            <input 
                required 
                class="col-span-2 mb-2 px-2 py-1 rounded-md bg-gray-100 border border-gray-200
                    focus:outline-none"
                type="password" 
                v-model="loginForm.password">
            <div class="text-sm text-blue-500 cursor-pointer mb-2">Forgot password?</div>
            <button class="col-span-3 bg-gray-100 py-1 rounded-md shadow-md mb-3
                           text-lg font-semibold text-gray-600 text-center
                           flex justify-center items-center h-[32px]
                           hover:bg-gray-600 hover:text-gray-100">
                <template v-if="loadCompleted">Log in</template>
                <template v-else><Spinner class="text-center"/></template>
            </button>
            <div class="col-span-3 text-sm text-gray-600">
                First time here? <span 
                    class="cursor-pointer
                        underline underline-offset-2
                        hover:font-medium">
                    Sign up</span>
            </div>
        </form>
    </div>
</template>
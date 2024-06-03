<script setup lang="ts">
import { reactive, ref, watch } from 'vue';
import { deleteAccount } from '../../api/post/deleteAccount';
import { useRoute, useRouter } from 'vue-router';
import { setAccount } from '../../api/get/account';
import LoadingPage from './LoadingPage.vue';
import { updateAccount } from '../../api/post/updateAccount';
import { generatePassword } from '../../logic/generatePassword';
const account = reactive({
    id: '',
    username: '',
    password: '',
    applicationName: '',
    type: '',
    dateAudit: ''
})
const loadCompleted = ref(true)
const route = useRoute()
const router = useRouter()
const invalidPassword = ref(false);
const displayUpdated = ref(false)

watch(() => route.params.id, async (newId) => {
    loadCompleted.value = false
    await setAccount(newId.toString(), account)
    loadCompleted.value = true
},
    {
        immediate: true
    })
async function doUpdate() {
    await updateAccount(account);
    // Reload the data after update
    loadCompleted.value = false;
    await setAccount(route.params.id.toString(), account);
    loadCompleted.value = true;
    hided.value = true;
    displayUpdated.value = false; // Exit update mode
}
async function doDelete(id: string): Promise<void> {
    await deleteAccount(id)
        .then(() => router.replace({ path: '/', query: { reload: 'true' } }))
}
const hided = ref(true);
</script>
<template>
    <div class="p-4 pt-8 sm:ml-64">
        <div class="p-2 border-2 border-gray-200 border-dashed rounded-lg ">
            <div v-if="loadCompleted" class="px-2 py-4 bg-gray-100 rounded-lg">
                <h1 class="mb-2
                    text-2xl font-semibold">
                    {{ account.applicationName }}</h1>
                <div class="text-gray-800">
                    <h1 class="mb-1 px-2 font-semibold">
                        Username
                    </h1>
                    <h1 class="bg-white w-fit px-2 py-1 rounded-lg border-b text-sm">
                        {{ account.username }}
                    </h1>
                    <h1 class="mb-1 px-2 font-semibold">
                        Password
                    </h1>
                    <div class="flex">
                        <input :disabled="!displayUpdated" :type="hided ? 'password' : 'text'" @blur="() => {
                            invalidPassword = account.password.length < 8;
                        }" @focus="() => invalidPassword = false" v-model="account.password"
                            class="bg-white w-fit mr-2 px-2 py-1 rounded-lg border-b cursor-text text-sm focus:outline-none">
                        <button v-if="displayUpdated == true" @click="doUpdate"
                            :disabled="(account.password.length < 8 || !loadCompleted)"
                            :class="{ 'cursor-not-allowed': account.password.length < 8, 'cursor-progress': !loadCompleted }"
                            class="mr-1 text-gray-500 hover:text-gray-600">

                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 16 16">
                                <path fill="currentColor"
                                    d="M8.5 1.5A1.5 1.5 0 0 1 10 0h4a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h6c-.314.418-.5.937-.5 1.5v7.793L4.854 6.646a.5.5 0 1 0-.708.708l3.5 3.5a.5.5 0 0 0 .708 0l3.5-3.5a.5.5 0 0 0-.708-.708L8.5 9.293z" />
                            </svg>
                        </button>
                        <button v-if="displayUpdated == false" @click="() => hided = !hided"
                            class="text-gray-500 hover:text-gray-800">
                            <svg v-if="hided == true" xmlns="http://www.w3.org/2000/svg" width="1.2rem" height="1.2rem"
                                viewBox="0 0 15 15">
                                <path fill="currentColor" fill-rule="evenodd"
                                    d="M11 3.5V6h1.5A1.5 1.5 0 0 1 14 7.5v6a1.5 1.5 0 0 1-1.5 1.5h-10A1.5 1.5 0 0 1 1 13.5v-6A1.5 1.5 0 0 1 2.5 6H4V3.5a3.5 3.5 0 1 1 7 0m-6 0a2.5 2.5 0 0 1 5 0V6H5z"
                                    clip-rule="evenodd" />
                            </svg>
                            <svg v-show="hided == false" xmlns="http://www.w3.org/2000/svg" width="1.2rem"
                                height="1.2rem" viewBox="0 0 15 15">
                                <path fill="currentColor"
                                    d="M5 3.5a2.5 2.5 0 0 1 5 0V4h1v-.5a3.5 3.5 0 1 0-7 0V6H2.5A1.5 1.5 0 0 0 1 7.5v6A1.5 1.5 0 0 0 2.5 15h10a1.5 1.5 0 0 0 1.5-1.5v-6A1.5 1.5 0 0 0 12.5 6H5z" />
                            </svg>
                        </button>
                    </div>
                    <h1 class="mt-1 text-sm col-span-2 text-red-400 font-medium" v-if="invalidPassword">Password
                        length must be greater than or equal to 8</h1>
                    <h1 @click="() => {
                        account.password = generatePassword();
                        invalidPassword = false
                    }" 
                        v-if="displayUpdated"
                        class="mt-1 text-sm col-span-2 text-cyan-600
                        cursor-pointer underline underline-offset-2 
                        select-none">Generate password</h1>

                    <button @click="doDelete(String(account.id))" class="mt-1 px-2 py-1 bg-white rounded-lg border-2
                        text-red-400 font-semibold
                        hover:bg-red-400 hover:text-white">
                        Delete
                    </button>
                    <button @click="() => {
                        displayUpdated = !displayUpdated;
                        hided = false;
                    }" class="mt-1 px-2 py-1 bg-white rounded-lg border-2
                        text-gray-600 font-semibold
                        hover:bg-gray-600 hover:text-white">
                        Update
                    </button>
                </div>
            </div>
            <LoadingPage v-else class="px-2 py-4 bg-gray-100 rounded-lg" />
        </div>
    </div>
</template>
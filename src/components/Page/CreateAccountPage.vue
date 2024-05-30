<script setup lang="ts">
    import { reactive, ref } from 'vue';
    import { createAccount } from '../../api/post/createAccount';
    import CODEMAP from '../../api/get/requestResource';
    import { generatePassword } from '../../logic/generatePassword';
    const blankApplication = ref(false);
    const blankUsername = ref(false);
    const invalidPassword = ref(false);
    const loadCompleted = ref(true);

    const responseMessage: { value: string | undefined; } = ref('')
    const form = reactive({
        username: '',
        password: '',
        application: '',
        type: 'SOCIAL_MEDIA'
    })
    async function saveAccount() : Promise<void> {
        if (!(blankApplication.value || blankApplication.value || invalidPassword.value)) {
            loadCompleted.value = false;
            try {
            await createAccount(form)
                .catch(e => {
                    let statusCode : number  = e.response.status;
                    responseMessage.value = CODEMAP.get(statusCode);   
                })
                .finally(() => loadCompleted.value = true);
            }
            catch(err) {
                responseMessage.value = CODEMAP.get(500);
            }
        }
    }
</script>
<template>
    <div class="p-2 px-4">
        <h1 class="text-2xl text-gray-800 font-medium mb-2">
            🛸Create Account Form
        </h1>
        <form @submit.prevent="saveAccount" class="grid grid-cols-2 w-1/2">
            <h1 class="ml-1 text-lg font-medium text-gray-800">
                Application
            </h1>
            <h1 class="ml-1 text-lg font-medium text-gray-800">
                Type
            </h1>
            <input class="mr-2 px-2 py-1 rounded-lg
                text-sm text-gray-800
                focus:outline-none " type="text"
                @blur="() => {
                    if (form.application == '') 
                        blankApplication = true;
                    else blankApplication = false;
                }"
                @focus="() => blankApplication = false"
                :class="{'border' : blankApplication, 'border-red-400' : blankApplication}"
                v-model="form.application">
            <select class="mr-2 px-2 py-1 rounded-lg
                text-sm text-gray-800
                focus:outline-none"
                v-model="form.type">
                <option value="SOCIAL_MEDIA" selected>Social media </option>
                <option value="WEB_TOOL">Web tool</option>
                <option value="BANK_APPLICATION">Bank application</option>
                <option value="CARD">Card</option>
                <option value="SHOPPING_APPLICATION">Shopping application</option>
                <option value="OTHERS">Others</option>
            </select>
            <h1 class="text-sm text-red-400 font-medium"
                v-if="blankApplication"
            >Application mustn't be null</h1>
            <h1 class="ml-1 col-span-2 
                font-medium text-gray-800">
                Username
            </h1>
            <input class="mr-2 px-2 py-1 rounded-lg
                text-sm text-gray-800
                focus:outline-none" type="text"
                @blur="() => {
                    if (form.username == '') 
                        blankUsername = true;
                    else blankUsername = false;
                }"
                @focus="() => blankUsername = false"
                :class="{'border' : blankUsername, 'border-red-400' : blankUsername}"
                v-model="form.username">
            <h1 class="text-sm col-span-2 text-red-400 font-medium"
                v-if="blankUsername"
            >Username mustn't be null</h1>
            <h1 class="ml-1 col-span-2 
                font-medium text-gray-800">
                Password
            </h1>
            <input class="mr-2 px-2 py-1 rounded-lg
                text-sm text-gray-800
                focus:outline-none " type="text"
                @blur="() => {
                    if (form.password.length < 8) 
                        invalidPassword = true;
                    else invalidPassword = false;
                }"
                @focus="() => invalidPassword = false"
                :class="{'border' : invalidPassword, 'border-red-400' : invalidPassword}"
                v-model="form.password">

            <h1 class="mt-1 text-sm col-span-2 text-red-400 font-medium"
                v-if="invalidPassword"
            >Password length must be greater than or equal to 8</h1>

            <h1 @click="() => {
                    form.password = generatePassword(); 
                    invalidPassword = false
                }" 
                class="mt-1 text-sm col-span-2 text-cyan-600
                cursor-pointer underline underline-offset-2 
                select-none">Generate password</h1>

            <h1 class="mt-1 ml-1 text-sm col-span-2 text-red-400 font-medium"
            >{{ responseMessage }}</h1>
            <button 
                class="my-2 col-span-2 bg-green-500 rounded-lg py-1
                    font-medium text-gray-50 text-lg
                    flex justify-center items-center
                    hover:bg-green-600 hover:text-gray-100"
                :disabled="(form.application == '' || form.password.length < 8 || form.username == '')"
                :class="{'cursor-not-allowed' : form.application == '' || form.password.length < 8 || form.username == '', 'cursor-progress' : !loadCompleted}">
                    <span v-if="loadCompleted">Save</span>
                    <span v-else>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <rect width="2.8" height="12" x="1" y="6" fill="currentColor">
                                <animate id="svgSpinnersBarsScale0" attributeName="y" begin="0;svgSpinnersBarsScale1.end-0.1s" calcMode="spline" dur="0.6s" keySplines=".36,.61,.3,.98;.36,.61,.3,.98" values="6;1;6" />
                                <animate attributeName="height" begin="0;svgSpinnersBarsScale1.end-0.1s" calcMode="spline" dur="0.6s" keySplines=".36,.61,.3,.98;.36,.61,.3,.98" values="12;22;12" />
                            </rect>
                            <rect width="2.8" height="12" x="5.8" y="6" fill="currentColor">
                                <animate attributeName="y" begin="svgSpinnersBarsScale0.begin+0.1s" calcMode="spline" dur="0.6s" keySplines=".36,.61,.3,.98;.36,.61,.3,.98" values="6;1;6" />
                                <animate attributeName="height" begin="svgSpinnersBarsScale0.begin+0.1s" calcMode="spline" dur="0.6s" keySplines=".36,.61,.3,.98;.36,.61,.3,.98" values="12;22;12" />
                            </rect>
                            <rect width="2.8" height="12" x="10.6" y="6" fill="currentColor">
                                <animate attributeName="y" begin="svgSpinnersBarsScale0.begin+0.2s" calcMode="spline" dur="0.6s" keySplines=".36,.61,.3,.98;.36,.61,.3,.98" values="6;1;6" />
                                <animate attributeName="height" begin="svgSpinnersBarsScale0.begin+0.2s" calcMode="spline" dur="0.6s" keySplines=".36,.61,.3,.98;.36,.61,.3,.98" values="12;22;12" />
                            </rect>
                            <rect width="2.8" height="12" x="15.4" y="6" fill="currentColor">
                                <animate attributeName="y" begin="svgSpinnersBarsScale0.begin+0.3s" calcMode="spline" dur="0.6s" keySplines=".36,.61,.3,.98;.36,.61,.3,.98" values="6;1;6" />
                                <animate attributeName="height" begin="svgSpinnersBarsScale0.begin+0.3s" calcMode="spline" dur="0.6s" keySplines=".36,.61,.3,.98;.36,.61,.3,.98" values="12;22;12" />
                            </rect>
                            <rect width="2.8" height="12" x="20.2" y="6" fill="currentColor">
                                <animate id="svgSpinnersBarsScale1" attributeName="y" begin="svgSpinnersBarsScale0.begin+0.4s" calcMode="spline" dur="0.6s" keySplines=".36,.61,.3,.98;.36,.61,.3,.98" values="6;1;6" />
                                <animate attributeName="height" begin="svgSpinnersBarsScale0.begin+0.4s" calcMode="spline" dur="0.6s" keySplines=".36,.61,.3,.98;.36,.61,.3,.98" values="12;22;12" />
                            </rect>
                        </svg>
                    </span>
            </button>
        </form>
    </div>
</template>
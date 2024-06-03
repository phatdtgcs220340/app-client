<script setup lang="ts">
    import { computed, reactive, ref, watch } from 'vue';
    import { getApplications } from '../../api/get/application';
    import Application from '../../api/get/application';
    import ApplicationBar from './ApplicationBar.vue';
    import SearchBar from './SearchBar.vue';
    import { getAccessToken } from '../../env';
    import { logout } from '../../logic/authenticate.ts';
    import { useRoute } from 'vue-router';

    defineProps({ isOpened : Boolean })
    const isAuthenticated = ref(getAccessToken() != undefined);
    const route = useRoute()
    const applications = reactive<Array<Application>>([]);
    const startWith = ref('')
    const filteredApplications = computed(() => {
        return applications.filter((app) => app.applicationName
                                                .toLowerCase()
                                                .includes(startWith.value.toLowerCase()))
    });
    const displayApplications = ref(false)
    const loadCompleted = ref(true);
    const networkError = ref(false);
    async function loadApplications() {
        networkError.value = false;
        try {
        await getApplications()
            .then((data : Array<Application>) => {
                data.forEach((app) => applications.push(app))
            })
        }
        catch {
            networkError.value = true;
        }
        
    }
    watch(() => route.query, async(param : Object) => {
        if (param.hasOwnProperty('reload')){
            loadCompleted.value = false;
            applications.splice(0, applications.length);
            await loadApplications()
            loadCompleted.value = true;
        }
    })
    watch(displayApplications, async display => {
        if (display && applications.length == 0) {
            loadCompleted.value = false;
            await loadApplications()
            loadCompleted.value = true;
        }
    })
</script>
<template>
    <aside id="logo-sidebar" class="fixed top-0 left-0 z-40 w-64 pt-8 h-screen transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0" aria-label="Sidebar" :class="{'translate-x-0' : isOpened }">
    <div class="h-full px-3 pb-4 overflow-y-auto bg-white">
        <ul class="space-y-2 font-medium">
            <li>
                <RouterLink to="/"
                    class="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group cursor-pointer">
                <svg class="w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
                    <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z"/>
                    <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z"/>
                </svg>
                <span class="ms-3">Dashboard</span>
                </RouterLink>
            </li>
            <li>
                <RouterLink to="/create" v-if="isAuthenticated"
                 class="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 cursor-pointer group">
                <svg class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="m17.418 3.623-.018-.008a6.713 6.713 0 0 0-2.4-.569V2h1a1 1 0 1 0 0-2h-2a1 1 0 0 0-1 1v2H9.89A6.977 6.977 0 0 1 12 8v5h-2V8A5 5 0 1 0 0 8v6a1 1 0 0 0 1 1h8v4a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-4h6a1 1 0 0 0 1-1V8a5 5 0 0 0-2.582-4.377ZM6 12H4a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Z"/>
                </svg>
                <span class="flex-1 ms-3 whitespace-nowrap">Create Account</span>
                </RouterLink>
            </li>
            <li>
                <div @click="() => displayApplications = !displayApplications" v-if="isAuthenticated"
                    class="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group cursor-pointer">
                    <svg class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
                        <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z"/>
                    </svg>
                    <span class="flex-1 ms-3 whitespace-nowrap">Applications</span>
                </div>
                    <SearchBar
                        v-if="displayApplications" 
                        @search="word => startWith = word"   
                    />
                    <template 
                        v-for="application in filteredApplications"
                        :key="application.id"
                        v-if="displayApplications && loadCompleted"
                        >
                        <RouterLink :to="`/application/${application.id}`">
                            <ApplicationBar 
                                :applicationId="application.id"
                                :application="application.applicationName"
                            />
                        </RouterLink>
                    </template>
                    <template
                        v-if="displayApplications && !loadCompleted"
                        >
                        <svg class="mx-8 my-2 text-gray-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <g stroke="currentColor">
                                <circle cx="12" cy="12" r="9.5" fill="none" stroke-linecap="round" stroke-width="3">
                                    <animate attributeName="stroke-dasharray" calcMode="spline" dur="1.5s" keySplines="0.42,0,0.58,1;0.42,0,0.58,1;0.42,0,0.58,1" keyTimes="0;0.475;0.95;1" repeatCount="indefinite" values="0 150;42 150;42 150;42 150" />
                                    <animate attributeName="stroke-dashoffset" calcMode="spline" dur="1.5s" keySplines="0.42,0,0.58,1;0.42,0,0.58,1;0.42,0,0.58,1" keyTimes="0;0.475;0.95;1" repeatCount="indefinite" values="0;-16;-59;-59" />
                                </circle>
                                <animateTransform attributeName="transform" dur="2s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12" />
                            </g>
                        </svg>
                    </template>
                    <h1 class="ml-3 text-sm text-red-400 font-medium flex gap-1 items-center"
                        v-if="networkError && displayApplications"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="1.2rem" height="1.2rem" viewBox="0 0 20 20">
                            <circle cx="10" cy="16" r="2" fill="currentColor" />
                            <path fill="currentColor" d="M16.4 11.6A7.1 7.1 0 0 0 12 9.1l3.4 3.4zM19 8.4A12.2 14 0 0 0 8.2 4.2L10 6a9.9 9.9 0 0 1 7.4 3.7zM3.5 2L2 3.4l2.2 2.2A13.1 13.1 0 0 0 1 8.4l1.5 1.3a10.7 10.7 0 0 1 3.2-2.6L8 9.3a7.3 7.3 0 0 0-3.3 2.3L6.1 13a5.2 5.2 0 0 1 3.6-2l6.8 7l1.5-1.5z" />
                         </svg>
                        Network error
                    </h1>
            </li>
            <li>
                <RouterLink to="/login" v-if="!isAuthenticated" class="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group cursor-pointer"
                    >
                    <svg class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 16">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"/>
                    </svg>
                    <span class="flex-1 ms-3 whitespace-nowrap">Login</span>
                </RouterLink>
            </li>
            <li>
                <div v-if="isAuthenticated" @click="logout"
                    class="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group cursor-pointer"
                    >
                    <svg class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 16">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"/>
                    </svg>
                    <span class="flex-1 ms-3 whitespace-nowrap">Logout</span>
                </div>
            </li>
        </ul>
    </div>
    </aside>

    
</template>
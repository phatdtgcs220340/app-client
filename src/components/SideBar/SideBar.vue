<script setup lang="ts">
    import { computed, reactive, ref, watch } from 'vue';
    import { getApplications } from '../../utils/application';
    import Application from '../../utils/application';
    import ApplicationBar from './ApplicationBar.vue';
    import SearchBar from './SearchBar.vue';

    const emit = defineEmits(['toggleLogin', 'toggleDashboard','toggleAccount'])
    const applications = reactive<Array<Application>>([]);
    const startWith = ref('')
    const filteredApplications = computed(() => {
        return applications.filter((app) => app.applicationName
                                                .toLowerCase()
                                                .includes(startWith.value))
    });
    const displayApplications = ref(false)
    const loadCompleted = ref(true);

    watch(displayApplications, async (display) => {
        if (display && applications.length == 0) {
                loadCompleted.value = false;
                await getApplications()
                    .then((data : Array<Application>) => {
                        // Assuming data is an array of Application
                        data.forEach((app) => {
                            applications.push(app);
                        })
                    })
                    .finally(() => {
                        loadCompleted.value = true;
                    });
        }
    })
    
</script>
<template>
    <aside id="logo-sidebar" class="fixed top-0 left-0 z-40 w-64 pt-8 h-screen transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0" aria-label="Sidebar">
    <div class="h-full px-3 pb-4 overflow-y-auto bg-white">
        <ul class="space-y-2 font-medium">
            <li>
                <div @click="$emit('toggleDashboard')"
                    class="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group cursor-pointer">
                <svg class="w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
                    <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z"/>
                    <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z"/>
                </svg>
                <span class="ms-3">Dashboard</span>
                </div>
            </li>
            <li>
                <div @click="() => displayApplications = !displayApplications" 
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
                        <ApplicationBar 
                            @open-account="$emit('toggleAccount', application.id)"
                            :applicationId="application.id"
                            :application="application.applicationName"
                        />
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
            </li>
            <li>
                <div class="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group cursor-pointer"
                    @click="$emit('toggleLogin')">
                    <svg class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 16">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"/>
                    </svg>
                    <span class="flex-1 ms-3 whitespace-nowrap">Sign In</span>
                </div>
            </li>
        </ul>
    </div>
    </aside>

    
</template>
<script setup lang="ts">
    import { exchangeAccessToken } from '../../logic/exchangeAccessToken';
    let params = new URL(document.location.toString()).searchParams;
    let code = params.get("code")
    await exchangeAccessToken(code)
    window.location.assign("/")
</script>
<template>
    <div class="p-4 pt-8 sm:ml-64">
        <div class="p-2 border-2 border-gray-200 border-dashed rounded-lg ">
            <div class="px-2 py-4 bg-gray-100 rounded-lg flex items-center justify-center">
                <svg class="mx-8 my-2 text-gray-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                    viewBox="0 0 24 24">
                    <g stroke="currentColor">
                        <circle cx="12" cy="12" r="9.5" fill="none" stroke-linecap="round" stroke-width="3">
                            <animate attributeName="stroke-dasharray" calcMode="spline" dur="1.5s"
                                keySplines="0.42,0,0.58,1;0.42,0,0.58,1;0.42,0,0.58,1" keyTimes="0;0.475;0.95;1"
                                repeatCount="indefinite" values="0 150;42 150;42 150;42 150" />
                            <animate attributeName="stroke-dashoffset" calcMode="spline" dur="1.5s"
                                keySplines="0.42,0,0.58,1;0.42,0,0.58,1;0.42,0,0.58,1" keyTimes="0;0.475;0.95;1"
                                repeatCount="indefinite" values="0;-16;-59;-59" />
                        </circle>
                        <animateTransform attributeName="transform" dur="2s" repeatCount="indefinite" type="rotate"
                            values="0 12 12;360 12 12" />
                    </g>
                </svg>
            </div>
        </div>
    </div>
</template>
<script setup>
 import { useEventListener, whenever } from '@vueuse/core'
 import { Application, Loader, onTick } from "vue3-pixi";
 import { reactive, ref } from 'vue'

 import Loop from '@/components/Loop.vue'
 import Waiting from '@/components/Waiting.vue'

 const width = (window.innerWidth);
 const height = (window.innerHeight);
 const resolution = window.devicePixelRatio;

 const images = {
     moon: '/textures/moon.png',
     rocketFire: '/textures/rocket.png',
     rocketEmpty: '/textures/rocket-empty.png'
 }

 const gameState = reactive({});

 function levelup() {
     console.log('levelup')
 }

</script>
<template>
    <Application :width="width" :height="height"
                 :resolution="resolution"
                 backgroundColor="#aa33ff">
        <Loader :resources="images">
            <!-- loading state via #fallback slot -->
            <template #fallback>
                <text :anchor="0.5" :x="120" :y="120" :style="{ fill: 'white' }">
                    Loading...
                </text>
            </template>
            <!-- component with nested async dependencies -->
            <template #default="{ textures }">
                <Waiting v-if="!gameState.active" />
                <Loop v-else @levelup="levelup" />

            </template>
        </Loader>
    </Application>
</template>

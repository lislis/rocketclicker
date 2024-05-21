<script setup>
 import { useEventListener, whenever } from '@vueuse/core'
 import { Application, Loader, onTick } from "vue3-pixi";
 import { reactive, ref, watch } from 'vue'
 import { storeToRefs } from 'pinia'
 import { useClickStore } from '@/stores/click'
 import Loop from '@/components/Loop.vue'
 import Waiting from '@/components/Waiting.vue'

 const store = useClickStore();
 const { getGame, getUsers, getClicks } = storeToRefs(store)

 const width = (window.innerWidth);
 const height = (window.innerHeight);
 const resolution = window.devicePixelRatio;

 const images = {
     moon: '/textures/moon.png',
     rocketFire: '/textures/rocket.png',
     rocketEmpty: '/textures/rocket-empty.png'
 }

 function levelup() {
     console.log('levelup')
 }

 watch('getGame', (mew) => {
     console.log(mew)
 })

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
                <Waiting v-if="!getGame" />
                <Loop v-else @levelup="levelup" />

            </template>
        </Loader>
    </Application>
</template>

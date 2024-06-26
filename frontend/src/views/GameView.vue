<script setup>
import { useEventListener, whenever } from '@vueuse/core'
import { Application, Loader, onTick } from "vue3-pixi";
import { reactive, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useClickStore } from '@/stores/click'
import Loop from '@/components/Loop.vue'
//import Waiting from '@/components/Waiting.vue'
import ClickHistory from '@/components/ClickHistory.vue'
import { useRoute, useRouter } from 'vue-router'

const store = useClickStore();
const { getGame, getClicks } = storeToRefs(store)

const router = useRouter();

const width = window.innerWidth;
const height = window.outerHeight;
const resolution = window.devicePixelRatio;

const images = {
    moon: '/textures/moon3.png',
    bg1: '/textures/background-stars2.png',
    whitepaper: '/textures/whitepaper2.png',
    currencies: '/textures/currencies2.png',
    headlines: '/textures/headlines.png',
    rocketFire: '/textures/rocket2-fire.png',
    rocketEmpty: '/textures/rocket2.png',
    bitcoin: '/textures/bitcoin.png',
}

if (getGame.value === undefined || getGame.value === null) {
    router.push({name: 'waiting'})
}

whenever(
    () => getGame.value === undefined || getGame.value === null, 
    () => router.push({name: 'waiting'})
)

</script>
<template>
    <ClickHistory :clicks="getClicks" />
    <Application :width="width" :height="height"
                 :resolution="resolution"
                 backgroundColor="#3c2f6b">
        <Loader :resources="images">
            <!-- loading state via #fallback slot -->
            <template #fallback>
                <text :anchor="0.5" :x="120" :y="120"
                      :style="{ fill: 'white' }">
                    Laden...
                </text>
            </template>
            <!-- component with nested async dependencies -->
            <template #default="{ textures }">
                <Loop v-if="getGame" />    
            </template>
        </Loader>
    </Application>
</template>

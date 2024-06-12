<script setup>
import { useEventListener, whenever } from '@vueuse/core'
import { Application, Loader, onTick } from "vue3-pixi";
import { reactive, ref, watch, provide } from 'vue'
import { storeToRefs } from 'pinia'
import { useClickStore } from '@/stores/click'
import Loop from '@/components/Loop.vue'
import Waiting from '@/components/Waiting.vue'
import ClickHistory from '@/components/ClickHistory.vue'

const store = useClickStore();
const { getGame, getUsers, getClicks } = storeToRefs(store)

const width = window.innerWidth;
const height = window.outerHeight;
const resolution = window.devicePixelRatio;

provide('wWidth', width);
provide('wHeight', height);

const images = {
    moon: '/textures/moon2.png',
    mars: '/textures/mars.png',
    bg1: '/textures/background-stars2.png',
    rocketFire: '/textures/rocket.png',
    rocketEmpty: '/textures/rocket-empty.png'
}

</script>
<template>
    <ClickHistory :clicks="getClicks" />
    <Application :width="width" :height="height"
                 :resolution="resolution"
                 backgroundColor="#2d0e90">
        <Loader :resources="images">
            <!-- loading state via #fallback slot -->
            <template #fallback>
                <text :anchor="0.5" :x="120" :y="120"
                      :style="{ fill: 'white' }">
                    Loading...
                </text>
            </template>
            <!-- component with nested async dependencies -->
            <template #default="{ textures }">
                <Waiting v-if="!getGame" />
                <template v-else>
                    <Loop />
                </template>
            </template>
        </Loader>
    </Application>
</template>

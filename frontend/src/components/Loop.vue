<script setup>
import { useEventListener, whenever } from '@vueuse/core'
import { Application, Loader, onTick } from "vue3-pixi";
import { reactive, ref, watch, useModel } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { levels } from '@/data/game.js'
import { cannon } from '@/data/particle.js'
import { sound } from '@pixi/sound';

import Rocket from '@/components/Rocket.vue'
import Moon from '@/components/Moon.vue'
import BG from '@/components/BG.vue'
import Skyline from '@/components/Skyline.vue'

const router = useRouter()
sound.add('yay', '/sounds/yay.wav');

function distanceBetweenTwoPoints(p1, p2) {
    const a = p1.x - p2.x;
    const b = p1.y - p2.y;
    return Math.hypot(a, b);
}

function levelup() {
    level.value = level.value + 1;
    if (Object.keys(levels).length < level.value) {
        router.push({ name: 'video'})
    } else {
        state = reactive(levels[level.value]);
        moonCoords.x = window.innerWidth - state.moon.x;
        moonCoords.y = state.moon.y;
        bgDistance.value = 0;
        bgDistance2.value = state.bg.width;
        cityCoords.scale = state.skyline.scale;
        cityCoords.y = state.skyline.y;
        cityCoords.x = state.skyline.x;
        cityCoords2.scale = state.skyline.scale;
        cityCoords2.y = state.skyline.y;
        cityCoords2.x = state.skyline.width;
    }
}

const level = ref(1);
let state = reactive(levels[level.value]);
const distance = ref(0);
const bgDistance = ref(0);
const bgDistance2 = ref(state.bg.width);
const moonCoords = reactive({ x: window.innerWidth - state.moon.x, y: state.moon.y, rotate: 0})
const cityCoords = reactive({ x: state.skyline.x, y: state.skyline.y, scale: state.skyline.scale })
const cityCoords2 = reactive({ x: state.skyline.width, y: state.skyline.y, scale: state.skyline.scale })

onTick((dt) => {
    distance.value = distanceBetweenTwoPoints(state.rocket, moonCoords);

    moonCoords.rotate += 0.003 * dt;
    
    const bg_dx = dt * 0.99;
    bgDistance.value -= bg_dx;
    bgDistance2.value -= bg_dx;

    const bg_city = dt * 2.8;
    cityCoords.x -= bg_city;
    cityCoords2.x -= bg_city;

    if (bgDistance.value <= -state.bg.width) {
        bgDistance.value += state.bg.width * 2;
    }
    if (bgDistance2.value <= -state.bg.width) {
        bgDistance2.value += state.bg.width * 2;
    }
    if (cityCoords.x <= -state.skyline.width) {
        cityCoords.x += state.skyline.width * 2;
    }
    if (cityCoords2.x <= -state.skyline.width) {
        cityCoords2.x += state.skyline.width * 2;
    }

})

whenever(
    () => distance.value < state.distance,
    () => {
        sound.play('yay');
        cannon(1)
        levelup()
    }
)

</script>
<template>
    <container>
        <BG :x="bgDistance" :y="state.bg.y" 
            :scale="state.bg.scale" />
        <BG :x="bgDistance2" :y="state.bg.y" 
            :scale="state.bg.scale" />

        <Skyline :x="cityCoords.x" :y="cityCoords.y" :scale="cityCoords.scale" />
        <Skyline :x="cityCoords2.x" :y="cityCoords2.y" :scale="cityCoords2.scale" />

        <text x="40" y="30"
              :style="{ fill: 'white' }">{{state.blurp}}</text>

        <Moon v-model:x="moonCoords.x" v-model:y="moonCoords.y" v-model:scale="state.moon.scale" v-model:rotate="moonCoords.rotate" />
        <Rocket v-model:x="state.rocket.x" v-model:y="state.rocket.y" />
    </container>
</template>

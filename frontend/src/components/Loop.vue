<script setup>
import { useEventListener, whenever } from '@vueuse/core'
import { Application, Loader, onTick } from "vue3-pixi";
import { reactive, ref, watch, useModel } from 'vue'
import { levels } from '@/data/game'

import Rocket from '@/components/Rocket.vue'
import Moon from '@/components/Moon.vue'
import BG from '@/components/BG.vue'

function distanceBetweenTwoPoints(p1, p2) {
    const a = p1.x - p2.x;
    const b = p1.y - p2.y;
    return Math.hypot(a, b);
}

function levelup() {
    level.value = level.value + 1;
    state = reactive(levels[level.value]);
    bgDistance.value = 0;
    bgDistance2.value = state.bg.width;
}

const level = ref(1);
let state = reactive(levels[level.value]);
const distance = ref(0);

const bgDistance = ref(0);
const bgDistance2 = ref(state.bg.width);

onTick((dt) => {
    distance.value = distanceBetweenTwoPoints(state.rocket, state.moon);

    const bg_dx = dt * 0.9;
    
    bgDistance.value -= bg_dx;
    bgDistance2.value -= bg_dx;

    if (bgDistance.value <= -state.bg.width) {
        bgDistance.value += state.bg.width * 2;
    }
    if (bgDistance2.value <= -state.bg.width) {
        bgDistance2.value += state.bg.width * 2;
    }
})

whenever(
    () => distance.value < state.distance,
    () => levelup()
)

</script>
<template>
    <container>
        <BG :x="bgDistance" :y="state.bg.y" 
            :scale="state.bg.scale" />
        <BG :x="bgDistance2" :y="state.bg.y" 
            :scale="state.bg.scale" />
        <text :x="20" :y="20"
              :style="{ fill: 'white' }">{{state.blurp}}</text>

        <Moon v-model:x="state.moon.x" v-model:y="state.moon.y" v-model:scale="state.moon.scale" />

        <Rocket v-model:x="state.rocket.x" v-model:y="state.rocket.y" />
    </container>
</template>

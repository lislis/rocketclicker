<script setup>
 import { useEventListener, whenever } from '@vueuse/core'
 import { Application, Loader, onTick } from "vue3-pixi";
 import { reactive, ref, watch } from 'vue'
 import { levels } from '@/data/game'

 import Rocket from '@/components/Rocket.vue'
 import Moon from '@/components/Moon.vue'

 function distanceBetweenTwoPoints(p1, p2) {
     const a = p1.x - p2.x;
     const b = p1.y - p2.y;

     return Math.hypot(a, b);
 }

 const level = ref(1);
 let state = reactive(levels[level.value]);
 const distance = ref(0);

 function levelup() {
     level.value = level.value + 1;
     state = reactive(levels[level.value]);
 }

 onTick((dt) => {
     distance.value = distanceBetweenTwoPoints(state.rocket, state.moon);
 })

 whenever(
     () => distance.value < state.distance,
     () => {
         levelup()
     }
 )

</script>
<template>
    <container>
        <text :x="20" :y="20"
              :style="{ fill: 'white' }">{{state.blurp}}</text>

        <Moon v-model:x="state.moon.x" v-model:y="state.moon.y" v-model:scale="state.moon.scale" />

        <Rocket v-model:x="state.rocket.x" v-model:y="state.rocket.y" />
    </container>
</template>

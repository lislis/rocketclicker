<script setup>
 import { useEventListener, whenever } from '@vueuse/core'
 import { Application, Loader, onTick } from "vue3-pixi";
 import { reactive, ref, watch } from 'vue'
 import { storeToRefs } from 'pinia'
 import { useClickStore } from '@/stores/click'
 import { levels } from '@/data/game'

 const store = useClickStore();
// const { getGame } = storeToRefs(store)

 import Rocket from '@/components/Rocket.vue'
 import Moon from '@/components/Moon.vue'

 const width = (window.innerWidth);

 function distanceBetweenTwoPoints(p1, p2) {
     const a = p1.x - p2.x;
     const b = p1.y - p2.y;

     return Math.hypot(a, b);
 }

 const level = ref(1);
 let state = reactive(levels[level.value]);
 //const position = reactive(levels[level.value].rocket)
 //const moon = reactive(levels[level.value].moon)
 const distance = ref(0);
 //const distance2Match = ref(levels[level.value].distance)

 function levelup() {
     level.value = level.value + 1;
     state = reactive(levels[level.value]);
     //position.value = levels[level.value].rocket;
     //moon.value = levels[level.value].moon;
     //distance2Match = levels[level.value].distance
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

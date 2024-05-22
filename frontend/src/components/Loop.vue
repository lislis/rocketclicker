<script setup>
 import { useEventListener, whenever } from '@vueuse/core'
 import { Application, Loader, onTick } from "vue3-pixi";
 import { reactive, ref, watch } from 'vue'
 import { storeToRefs } from 'pinia'
 import { useClickStore } from '@/stores/click'

 const store = useClickStore();
 const { getGame } = storeToRefs(store)

 import Rocket from '@/components/Rocket.vue'
 import Moon from '@/components/Moon.vue'

 const width = (window.innerWidth);


 function distanceBetweenTwoPoints(p1, p2) {
     const a = p1.x - p2.x;
     const b = p1.y - p2.y;

     return Math.hypot(a, b);
 }

 const position = reactive({ x: 80, y: 150 })
 const moon = reactive({ x: width - 70, y: 60, scale: 0.1})
 const distance = ref(0);

 function resetRocket() {
     position.x = 80;
     position.y = 150;
 }
 function levelup() {
     resetRocket();
     getGame.value.level += 1;
     setMoon(getGame.value.level);
 }
 function setMoon(level) {
     console.log('geing here', level)
     switch(level) {
         case 2:
             moon.scale = 0.2;
             break;
         case 3:
             moon.scale = 0.3;
             break;
         case 4:
             moon.scale = 0.4;
             break;
     }
 }

 onTick((dt) => {
     //console.log('distance ', distanceBetweenTwoPoints(position, moon))
     distance.value = distanceBetweenTwoPoints(position, moon);
 })

 whenever(
     () => distance.value < 75,
     () => {
         console.log(distance.value, getGame.level)
         levelup()
     }
 )

</script>
<template>
    <container>
        <text :x="20" :y="20"
              :style="{ fill: 'white' }">To the Moon!</text>

        <Moon v-model:x="moon.x" v-model:y="moon.y" v-model:scale="moon.scale" />

        <Rocket v-model:x="position.x" v-model:y="position.y"
                @die="gameover = true" />
    </container>
</template>

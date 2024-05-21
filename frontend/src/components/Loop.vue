<script setup>
 import { useEventListener, whenever } from '@vueuse/core'
 import { Application, Loader, onTick } from "vue3-pixi";
 import { reactive, ref } from 'vue'

 import Rocket from '@/components/Rocket.vue'
 import Moon from '@/components/Moon.vue'

 const width = (window.innerWidth);
 const height = (window.innerHeight);
 const resolution = window.devicePixelRatio;


 function distanceBetweenTwoPoints(p1, p2) {
     const a = p1.x - p2.x;
     const b = p1.y - p2.y;

     return Math.hypot(a, b);
 }

 const position = reactive({ x: 80, y: 150 })
 const moon = reactive({ x: width - 70, y: 60, scale: 0.1})
 const distance = ref(0);

 const emit = defineEmits(['levelup'])

 onTick((dt) => {
     //console.log('distance ', distanceBetweenTwoPoints(position, moon))
     distance.value = distanceBetweenTwoPoints(position, moon);
 })

 whenever(
     () => distance.value < 75,
     () => emit('levelup')
 )

</script>
<template>
    <container>
        <text :x="20" :y="20"
              :style="{ fill: 'white' }">Up and to the right!</text>

        <Moon v-model:x="moon.x" v-model:y="moon.y" v-model:scale="moon.scale" />

        <Rocket v-model:x="position.x" v-model:y="position.y"
                @die="gameover = true" />
    </container>
</template>

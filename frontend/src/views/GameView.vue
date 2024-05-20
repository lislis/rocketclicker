<script setup>
 import { Application, Loader, onTick } from "vue3-pixi";
 import { reactive } from 'vue'

 import Rocket from '@/components/Rocket.vue'

 const width = (window.innerWidth);
 const height = (window.innerHeight);
 const resolution = window.devicePixelRatio;

 const images = {
     moon: '/textures/moon.png',
     rocketFire: '/textures/rocket.png',
     rocketEmpty: '/textures/rocket-empty.png'
 }

 const position = reactive({ x: 80, y: 150 })


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
                <text :x="20" :y="20"
                      :style="{ fill: 'white' }">Up and to the right!</text>

                <Rocket v-model:x="position.x" v-model:y="position.y"
                      @die="gameover = true" />
            </template>
        </Loader>
    </Application>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { cannon } from '@/data/particle.js'
import { storeToRefs } from 'pinia'
import { useClickStore } from '@/stores/click'
import { useEventListener, whenever } from '@vueuse/core'
import { onTick } from "vue3-pixi";

const store = useClickStore();
const { getGame } = storeToRefs(store)

const route = useRoute()
const router = useRouter()
const timer = ref(0);

onTick((dt) => {
    //console.log(timer.value)
    timer.value += dt;
})

// returning to game 
whenever(
    () => timer.value > 300,
    () => router.push({name: 'game', params: { level: route.params.level }})
)

// when game is being stopped
whenever(
    () => getGame.value === undefined || getGame.value === null, 
    () => router.push({name: 'waiting'})
)

cannon(3)
</script>

<template>
    <div class="bg">
        <h1 class="headline">Level {{route.params.level}}</h1>
    </div>
</template>
<style scoped>
.headline {
    font-size: 4em;
    text-align: center;
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto;    
    left: 0;
    right: 0;
    height: 4em;
    color: white;
    animation: titleanim infinite 1s ease alternate;
    font-weight: 600;
}
.bg {
    background-image: url(/textures/background-stars2.png);
    background-size: cover;
    height: 100%;
    background-repeat: no-repeat;
    background-blend-mode: color-dodge;
    background-color: #3c2f6b;
    animation: bganim 1 30s linear alternate;
}
@keyframes bganim {
    0% {
        background-position: 0% 0%;
    }
    100% {
        background-position: 100% 0%;
    }
}
@keyframes titleanim {
    0% {
        font-size: 3em;
    }
    100% {
        font-size: 4em;
    }
}
</style>
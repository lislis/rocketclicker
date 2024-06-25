<script setup>
import { useRoute, useRouter } from 'vue-router'
import Loader from '@/components/Loader.vue'
import { storeToRefs } from 'pinia'
import { useClickStore } from '@/stores/click'
import { useEventListener, whenever } from '@vueuse/core'
import { onTick } from "vue3-pixi";

const store = useClickStore();
const { getGame } = storeToRefs(store)

const route = useRoute()
const router = useRouter()

onTick((dt) => {
    //console.log(getGame.value !== undefined, getGame.value !== null, Object.keys(getGame.value).includes('level'))
})

whenever(
    () => {
        if (getGame.value !== undefined && getGame.value !== null) {
            if (getGame.value && Object.keys(getGame.value).includes('level')) {
                return true;
            }
        } 
    }, 
    () => router.push({name: 'level', params: { level: getGame.value.level  }})
)
</script>

<template>
    <div>
        <Loader />
        <p class="waiting">Warten bis das Spiel startet...</p>
    </div>
</template>
<style scoped>
    .waiting {
    text-align: center;
}

</style>
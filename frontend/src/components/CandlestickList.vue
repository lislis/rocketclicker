<script setup>
    import Candlestick from '@/components/Candlestick.vue';
    import { useClickStore } from '@/stores/click'
    import { storeToRefs } from 'pinia'
    //import { onTick } from 'vue3-pixi';

    const store = useClickStore();
    const { getCandlesticks } = storeToRefs(store)
</script>
<template>
    <container v-for="(candlestick, i) in getCandlesticks" :key="candlestick.id">
        <Candlestick v-bind:index="i" />
    </container>
</template>
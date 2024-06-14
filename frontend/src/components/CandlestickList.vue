<script setup>
    import Candlestick from '@/components/Candlestick.vue';
    import { useClickStore } from '@/stores/click'
    import { storeToRefs } from 'pinia'

    const store = useClickStore();
    const { getCandlesticks } = storeToRefs(store)
</script>
<template>
    <container v-for="(candlestick, i) in getCandlesticks" :key="candlestick.id">
        <Candlestick :stick="getCandlesticks[i]" />
    </container>
</template>
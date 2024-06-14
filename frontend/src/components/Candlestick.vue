<script setup>
    import { storeToRefs } from 'pinia'
    import { useClickStore } from '@/stores/click'

    const store = useClickStore();
    const { getCandlesticks } = storeToRefs(store)

    function onDrawCandleStick(someRect, candlestick) {
        console.log(someRect, candlestick);
        someRect.beginFill(16711680);
        someRect.drawRect(0, 0, 20, 90);
        someRect.endFill();
    }
</script>
<template>
    <graphics v-for="candlestick in getCandlesticks" @render="onDrawCandleStick(candlestick)" :x="candlestick.x" :y="candlestick.y" />
</template>
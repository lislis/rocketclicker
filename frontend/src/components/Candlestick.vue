<script setup>
    import { toRefs, reactive, computed } from 'vue';
    import { useClickStore } from '@/stores/click'
    import { storeToRefs,  } from 'pinia'

    const props = defineProps(['index'])
    const store = useClickStore();
   const stick = store.getCandlestickByIndex(props.index);

    const stickWidth = 15;
    const stickHeight = computed(() => (stick.open > stick.close) ? stick.open - stick.close : stick.close - stick.open);
    const stickColor = computed(() => (stick.open < stick.close) ? 16711680 : 65280);

    function onDrawCandleStick(someRect) {
        someRect.clear()
        someRect.beginFill(stickColor.value, 0.5);
        someRect.drawRect(0, stick.y - stick.open, stickWidth, stickHeight.value);
        someRect.endFill();
    }

    function onDrawWicks(realPath) {
        const w = stickWidth / 2;
        realPath.clear()
        realPath.lineStyle(2, stickColor.value, 0.5);
        realPath.moveTo(w, -stick.oWick);
        realPath.lineTo(w, 0);
        realPath.moveTo(w, stickHeight.value);
        realPath.lineTo(w, stickHeight.value + stick.cWick);
    }
</script>
<template>
    <graphics :x="stick.x" :y="stick.y" @render="onDrawWicks" />
    <graphics @render="onDrawCandleStick" :x="stick.x" :y="stick.y" />
</template>
<script setup>
    import { useModel } from 'vue'
    import { onTick } from 'vue3-pixi'

    const props = defineProps(['stick', 'key'])
    //const stick = useModel(props, 'stick')
    //const key = useModel(props, 'key');

    //console.log(key, stick);
    const { stick } = props;

    const stickWidth = 20;
    const stickHeight = (stick.open >= stick.close) ? stick.open - stick.close : stick.close - stick.open;
    const stickColor = (stick.open >= stick.close) ? 16711680 : 65280;

     onTick((dt) => {
         console.log(stick.open, stick.x, stickHeight)
    })

    function onDrawCandleStick(someRect) {
        someRect.beginFill(stickColor);
        someRect.drawRect(0, stick.y - stick.open, stickWidth, 20);
        someRect.endFill();
    }

    function onDrawWicks(realPath) {
        realPath.lineStyle(2, stickColor, 1);
        realPath.moveTo(stickWidth / 2, -stick.oWick);
        realPath.lineTo(stickWidth / 2, stickHeight + stick.cWick);
    }
</script>
<template>
    <graphics :x="stick.x" :y="stick.y" @render="onDrawWicks" />
    <graphics @render="onDrawCandleStick" :x="stick.x" :y="stick.y" />
</template>
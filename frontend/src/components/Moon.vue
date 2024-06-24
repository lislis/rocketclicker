<script setup>
    import { whenever } from '@vueuse/core'
    import { Texture, Container } from 'pixi.js'
    import { ref, useModel, computed } from 'vue'
    import { levels } from '@/data/game'

    const props = defineProps(['x', 'y', 'scale', 'rotate', 'texture']);

    const x = useModel(props, 'x');
    const y = useModel(props, 'y');
    const scale = useModel(props, 'scale');
    const rotate = useModel(props, 'rotate');
    const texture = useModel(props, 'texture');
    //const texture = computed(() => levels[props.level].moon.texture);
</script>
<template>
    <container >
        <sprite :anchor-x="0.5" :anchor-y="0.5" :texture="texture" :x="x" :y="y" :rotation="rotate"
        :scale="scale" alpha="0.98" />
    </container>
</template>

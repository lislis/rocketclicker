<script setup>
 import { whenever } from '@vueuse/core'
 import { Texture, Container } from 'pixi.js'
 import { ref, useModel, computed } from 'vue'
 import { onTick } from 'vue3-pixi'

 const props = defineProps(['x', 'y', 'scale']);

 const x = useModel(props, 'x');
 const y = useModel(props, 'y');
 const scale = useModel(props, 'scale');

 const texture = 'moon';
</script>
<template>
    <sprite :x="x" :y="y" :texture="texture"
            :anchor-x="0.5" :anchor-y="0.5"
            :scale="scale" />
</template>

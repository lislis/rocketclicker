<script setup>
import { whenever } from '@vueuse/core'
import { Texture, Container } from 'pixi.js'
import { ref, useModel, computed, inject } from 'vue'
import { onTick } from "vue3-pixi";

const props = defineProps(['x', 'y', 'scale']);

const x = useModel(props, 'x');
const y = useModel(props, 'y');
const scale = useModel(props, 'scale');

const texture = 'skyline';

</script>
<template>
    <sprite :x="x" :y="y" :texture="texture" :scale="scale" :alpha="0.88" />
</template>

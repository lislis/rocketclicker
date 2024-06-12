<script setup>
import { whenever } from '@vueuse/core'
import { Texture, Container } from 'pixi.js'
import { ref, useModel, computed, inject } from 'vue'
import { onTick } from "vue3-pixi";

const props = defineProps(['x', 'y', 'scale']);

const x = useModel(props, 'x');
const y = useModel(props, 'y');
const scale = useModel(props, 'scale');

const hHeight = inject('hHeight', window.outerHeight);
const texture = 'bg1';
</script>
<template>
    <sprite :x="x * scale" :y="y * scale" :texture="texture" alpha="0.56" :height="hHeight" />
</template>

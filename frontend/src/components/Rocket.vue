<script setup>
 import { useEventListener, whenever } from '@vueuse/core'
 import { Texture } from 'pixi.js'
 import { ref, useModel, computed, inject } from 'vue'
 import { onTick } from 'vue3-pixi'

 const socket = inject('socket');

 const props = defineProps(['x', 'y']);
 const emit = defineEmits(['die', 'level-up', 'update:x', 'update:y']);

 const x = useModel(props, 'x')
 const y = useModel(props, 'y')

 const velocity = ref(-6)
 const velocityX = ref(1)
 const gravity = 0.4
 const friction = 0.1

 const texture = computed(() => {
     return velocity.value < -2 ? 'rocketFire' : 'rocketEmpty';
 })

 const remove = onTick((dt) => {
     y.value += velocity.value * dt
     x.value += velocityX.value * dt

     velocity.value += gravity * dt
     velocityX.valuue += friction * dt
 })

 function jump() {
     velocity.value = -4
     velocityX.value = 1
 }

 socket.on('new-click', () => {
     jump();
 });

 // when hitting the ground
 whenever(
     () => y.value > window.innerHeight - 40,
     () => {
         y.value = window.innerHeight - 40
         velocity.value = 0
         velocityX.value = 0;
     },
 )

 // when hitting the ceiling
 whenever(
     () => y.value < 10,
     () => {
         y.value = 10
         velocity.value = 0
     },
 )

 // when hitting the right wall
 whenever(
     () => x.value > window.innerWidth - 30,
     () => {
         x.value = window.innerWidth - 30
         velocityX.value = 0
     })
</script>
<template>
    <sprite :x="x" :y="y" :texture="texture"
            :anchor-x="0.5" :anchor-y="0.5"
            scale="0.5" />
</template>

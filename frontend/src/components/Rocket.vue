<script setup>
 import { onKeyDown, useEventListener, whenever } from '@vueuse/core'
 import { SCALE_MODES, Texture } from 'pixi.js'
 import { ref, useModel, computed } from 'vue'
 import { onTick } from 'vue3-pixi'

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

     // apply gravity
     velocity.value += gravity * dt
     velocityX.valuue += friction * dt
 })

 function jump() {
     // jump upwards when clicked, negative velocity indicates upward direction
     velocity.value = -8
     velocityX.value = 1
 }

 useEventListener('click', jump)

 // when hitting the ground, player dies
 whenever(
     () => y.value > window.innerHeight - 40,
     () => {
         y.value = window.innerHeight - 40
         velocity.value = 0
         velocityX.value = 0;
         //emit('die')
         //remove()
     },
 )

 // when hitting the ceiling, player bounces back
 whenever(
     () => y.value < 10,
     () => {
         y.value = 10
         velocity.value = 0
         emit('level-up')
     },
 )
</script>
<template>
    <sprite :x="x" :y="y" :texture="texture"
            :anchor-x="0.5" :anchor-y="0.5"
            scale="0.2" />
</template>

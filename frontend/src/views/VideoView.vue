<script setup>
    import { cannon } from '@/data/particle.js'

    cannon(20)
</script>

<template>
    <video autoplay muted>
        <source src="/video/liftoff-reversed-cut.mp4" type="video/mp4" />
    </video>
</template>
<style scoped>
    video {
        width: 100vw;
        height: 100vh;
        object-position: bottom;
        object-fit: cover;
        position: fixed;
        top: 0;
        left: 0;
        z-index: -1;
        right: 0;
        opacity: 0.7;
    }
</style>
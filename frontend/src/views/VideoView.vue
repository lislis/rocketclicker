<script setup>
    import { cannon } from '@/data/particle.js'
    import { sound } from '@pixi/sound';
    import { wrappedFetch } from '@/utils';
    import { inject } from 'vue';
    import { useClickStore } from '@/stores/click'
    import { storeToRefs } from 'pinia'

    const store = useClickStore();
    const { getGame } = storeToRefs(store)

    const apiEndpoint = inject('apiEndpoint')

    sound.add('crypto', 'sounds/crypto-to-the-moon-min.mp3')

    sound.play('crypto')
    cannon(20)

    if (getGame.value) {
        wrappedFetch(`${apiEndpoint}/games/${getGame.value._id}`, 'PUT', JSON.stringify({active: false}))
            .then(d => d.json())
            .then(d => null)
    }
   
</script>

<template>
    <video autoplay muted>
        <source src="/video/output2.mp4" type="video/mp4" />
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
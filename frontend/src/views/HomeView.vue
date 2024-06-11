<script setup>
 import { storeToRefs } from 'pinia'
 import { useClickStore } from '@/stores/click'
 import { inject } from 'vue'
 import { wrappedFetch } from '@/utils';
 import Loader from '@/components/Loader.vue';
 import { sound } from '@pixi/sound';

 const store = useClickStore();
 const { me, myClicks, getGame } = storeToRefs(store)
 const { addMyClick } = store

 sound.add('pickupCoin', '/sounds/pickupCoin.wav');

 const apiEndpoint = inject('apiEndpoint')

 function countingClicks() {
     wrappedFetch(`${apiEndpoint}/clicks`,
                  'POST',
                  JSON.stringify({ by: me.value._id, username: me.value.name }))
         .then(d => d.json())
         .then(d => {
            sound.play('pickupCoin');
             addMyClick();
         })
 }

</script>

<template>
    <main class="userface" v-if="getGame">
        <div class="clickme" @click="countingClicks()">
            <p>click here!</p>
        </div>
        <div class="click-stats">You are {{me.name}}.</div>
        <div class="click-stats">You contributed <strong>{{myClicks}}</strong> clicks.</div>
    </main>
    <main v-else  class="userface">
        <div class="waiting">
            <Loader />
            Waiting for game to start
        </div>
    </main>
    <footer class="footer">
        To the Moon 🚀🌔 - Cryptolike by STERNA | PAU
    </footer>
</template>
<style scoped>


 .clickme {
     display: flex;
     justify-content: center;
     align-items: center;
     height: 60vh;
     border: 1em solid  rgba(255, 255, 255, 0.7);
     border-radius: 20px;
     background-color: rgba(255, 255, 255, 0.2);
     text-align: center;
     font-variant: small-caps;
     cursor: pointer;
     margin-bottom: 1rem;
 }
 .clickme p {
     -webkit-user-select: none;
     -moz-user-select: none;
     -ms-user-select: none;
     user-select: none;
     transition: font-size 200ms ease;
 }

 .clickme:active p {
     font-size: 1.4em;
 }

 .click-stats {
     font-size: 1.25rem;
     line-height: 1.55;
 }

 .userface {
     height: calc(100vh - var(--footer-height));
     color: lightgrey;
     background-color: midnightblue;
     padding: 1em;
 }

 .waiting {
     text-align: center;
 }

</style>

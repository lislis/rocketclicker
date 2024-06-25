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
const apiEndpoint = inject('apiEndpoint')

sound.add('pickupCoin', '/sounds/pickupCoin.wav');

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
            <button><span>Click!</span></button>
        </div>
        <div class="click-stats">Du bist <strong>{{me.name}}</strong>.</div>
        <div class="click-stats">Du hast <strong>{{myClicks}}</strong> Clicks beigetragen.</div>
    </main>
    <main v-else  class="userface">
        <div class="waiting">
            <Loader />
            Warten bis das Spiel startet...
        </div>
    </main>
    <footer class="footer">
        <a href="https://github.com/lislis/rocketclicker" target="_blank">Rocketclicker</a> 🚀🌔 - cryptolike by <a href="https://sternapau.de/" target="_blank">STERNA | PAU</a>
    </footer>
</template>
<style scoped>
.clickme {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 60vh;
    text-align: center;
    font-variant: small-caps;
    margin-bottom: 1rem;
}
.clickme button {
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    transition: transform 200ms ease;
    cursor: pointer;
    background: radial-gradient(
        circle at top,
        white,
        orange,
        red,
        darkred,
        maroon,
        black
    );
    border-radius: 50%;
    margin: 25px auto;
    height: 60vw;
    width: 60vw;
    border-top: none;
    border-right: 5px solid black;
    border-left: 5px solid black;
    border-bottom: 5px solid black;
    box-shadow: -5px 10px 20px black, 5px 10px 20px black;
}

.clickme button span {
    background: red;
    color: white;
    display: block;
    height: 47vw;
    width: 47vw;
    margin: auto;
    border-radius: 50%;
    font-size: 2rem;
    line-height: 6;
    text-shadow: -1px -1px 5px #ffffff3d, -1px 1px 10px #ffffff3d, 1px -1px 10px #ffffff3d, 1px 1px 10px #ffffff3d
}

.clickme:active button {
    transform: scale(0.9);
}

.click-stats {
    font-size: 1.25rem;
    line-height: 1.55;
}

.userface {
    height: calc(100vh - var(--footer-height));
    padding: 1em;
}

.waiting {
    text-align: center;
}

</style>

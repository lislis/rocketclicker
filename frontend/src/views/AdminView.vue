<script setup>
 import { useClickStore } from '@/stores/click'
 import { storeToRefs } from 'pinia'
 import { inject } from 'vue'
 import { wrappedFetch } from '@/utils';

 const store = useClickStore();
 const { getGame, getUsers, getClicks } = storeToRefs(store)
 const { newGame, rmGame } = store

 const apiEndpoint = inject('apiEndpoint')


 function startGame() {
     wrappedFetch(`${apiEndpoint}/games`, 'POST', null)
         .then(d => d.json())
         .then(d => newGame(d))
 }

 function stopGame() {
     wrappedFetch(`${apiEndpoint}/games`, 'DELETE', null)
         .then(d => d.json())
         .then(d => rmGame())
 }

</script>
<template>
    <div class="wrapper">
        <h1>Admin area</h1>
        <section class="game">
            <h2>Game state</h2>
            <div>
                <pre>{{getGame}}</pre>
            </div>
            <div>
                <button type="button" @click="startGame">Start game</button>
                <button type="button" v-if="getGame" @click="stopGame">Stop game</button>
            </div>
        </section>
        <section class="clicks">
            <h2>Clicks given</h2>
            <div>{{getClicks.length}}</div>
        </section>
        <section class="users">
            <h2>Users online</h2>
            <ul>
                <li v-for="user in getUsers">{{user.name}}</li>
            </ul>
        </section>
    </div>
</template>
<style scoped>
 .wrapper {
     padding: 1em;
     display: grid;
     grid-template-rows: auto 1fr 1fr;
     grid-template-columns: 1fr 1fr;
 }
 .game {
     grid-row: 2 / span 2;
     grid-column: 1;
 }
 .clicks {
     grid-row: 2 / span 1;
     grid-column: 2;
 }
 .users {
     grid-row: 3 / span 1;
     grid-column: 2;
 }
</style>

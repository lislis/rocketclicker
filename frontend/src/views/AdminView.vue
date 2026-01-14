<script setup>
 import { useClickStore } from '@/stores/click'
 import { storeToRefs } from 'pinia'
 import { inject, ref, toRaw } from 'vue'
 import { wrappedFetch } from '@/utils';

 const store = useClickStore();
 const { getGame, getUsers, getClicks, me, getJumpVal } = storeToRefs(store)
 const { newGame, rmGame } = store

 const apiEndpoint = inject('apiEndpoint')

 const intermitJump = ref(toRaw(getJumpVal.value))


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

 function updateJumpVal(ev) {
     let body = { jump_value: ev.target.value }
     console.log(body)
     wrappedFetch(`${apiEndpoint}/games/${getGame.value._id}`, 'PATCH', JSON.stringify(body))
         .then(d => d.json())
            .then(d => {
                getGame.value.jump_value = d.jump_value
                intermitJump.value = d.jump_value
             console.log(ev.target.value, d.jump_value)
         })
     //console.log(ev.target.value, getGame.value.jump_value)
 }

</script>
<template>
    <div class="admin-wrapper">
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
            <div v-if="getGame && getGame.jump_value">
                <hr class="spacer">
                <h3>Rocket jump value</h3>
                <input :value="getGame.jump_value"
                       type="range"
                       min="0.5" max="5" step="0.1"
                       @change="updateJumpVal"
                       class="range" />
                <p>{{getGame.jump_value}}</p>
            </div>
        </section>
        <section class="clicks">
            <h2>Clicks given</h2>
            <div>{{getClicks.length}}</div>
        </section>
        <section class="users">
            <h2>Users online ({{getUsers.length}})</h2>
            <ul>
                <li v-for="user in getUsers">
                    {{user.name}}
                    <span class="tag" v-if="user._id == me._id">me</span>
                </li>
            </ul>
        </section>
    </div>
</template>
<style scoped>
 .range {
     width: 100%;
 }
 .spacer {
     margin-top: 2em;
     margin-bottom: 1em;
 }
 .admin-wrapper {
     padding: 1em;
     display: grid;
     grid-template-rows: auto auto auto;
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
 .tag {
     background-color: grey;
     color: white;
     font-size: 0.8em;
     padding: 0 .2em 0.1em;
     vertical-align: text-bottom;
     border-radius: 4px;
 }
</style>

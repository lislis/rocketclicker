<script setup>
 import { storeToRefs } from 'pinia'
 import { useClickStore } from '@/stores/click'
 import { inject } from 'vue'

 const store = useClickStore();
 const { me, myClicks, getGame } = storeToRefs(store)
 const { addMyClick } = store

 import { wrappedFetch } from '@/utils';

 const apiEndpoint = inject('apiEndpoint')

 function countingClicks() {
     console.log(me);
     wrappedFetch(`${apiEndpoint}/clicks`,
                  'POST',
                  JSON.stringify({ by: me.value._id }))
         .then(d => d.json())
         .then(d => {
             addMyClick();
         })
 }

</script>

<template>
    <main class="userface" v-if="getGame">
        <div class="clickme" @click="countingClicks()">
            <p>click here!</p>
        </div>
        <div>You are {{me.name}}.</div>
        <div>You contributed {{myClicks}} clicks.</div>
    </main>
    <main v-else>
        <div>
            Waiting for game to start
        </div>
    </main>
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


 .userface {
     height: 100vh;
     width: 100vw;
     color: white;
     background-color: midnightblue;
     padding: 1em;
 }

</style>

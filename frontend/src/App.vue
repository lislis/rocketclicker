<script>
 import { RouterLink, RouterView } from 'vue-router'
 import { useClickStore } from '@/stores/click';

 export default {
     inject: ['socketServer', 'apiEndpoint', 'socket'],
     mounted() {
         this.socket.on('connect', (e) => {
             fetch(`${this.apiEndpoint}/users`, {
                 method: 'POST',
                 headers: {
                     "Content-Type": "application/json",
                     Accept: 'application/json'
                 },
                 referrerPolicy: "no-referrer",
                 body: JSON.stringify({socket: this.socket.id})
             }).then(d => d.json())
               .then(d => {
                   this.store.setMe(d);
               });

             this.socket.on('new-click', (evt) => {
                 this.store.addClick(evt.message);
             });
             this.socket.on('delete-all-clicks', (evt) => {
                 this.store.rmAllClicks();
             });
             this.socket.on('new-game', (evt) => {
                 this.store.newGame(evt.message);
             });
             this.socket.on('delete-game', (evt) => {
                 this.store.rmGame();
             });
             this.socket.on('update-game', (evt) => {
                 this.store.updateGame(evt.message);
             });
             this.socket.on('new-user', (evt) => {
                 this.store.addUser(evt.message);
             });
             this.socket.on('remove-user', (evt) => {
                 this.store.rmUser(evt.message);
             });
         });
     },
     setup() {
         const store = useClickStore();
         store.fetchClicks();
         store.fetchUsers();
         store.fetchGame();
         return { store };
     }
 }

</script>

<template>
    <div class="wrapper">
        <RouterView />
    </div>
</template>

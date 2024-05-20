<script>
 import { useClickStore } from '@/stores/click';

 export default {
     setup() {
         const store = useClickStore();
         return { store };
     },
     computed: {
         me() {
             return this.store.getMe;
         },
     },
     methods: {

     }
 }
</script>

<template>
    <main>
        <div>Home</div>
    </main>
</template>

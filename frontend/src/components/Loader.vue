<template>
    <div class="phases">
        <div class="bg">
        <span>🌑</span>
        <span>🌒</span>
        <span>🌓</span>
        <span>🌔</span>
        <span>🌕</span>
        <span>🌖</span>
        <span>🌗</span>
        <span>🌘</span>
        </div>
    </div>
</template>
<script setup>

</script>
<style scoped>
 .phases {
     margin: auto;
     width: 1em;
     height: 1.5em;
     overflow: hidden;
     text-align: center;
     font-size: 2em;
 }
 .bg {
     width: 8em;
     position: relative;
     animation: 3s steps(8, end) infinite phases;
 }
 @keyframes phases {
     0% {
         right: 0;
     }
     100% {
         right: 8em;
     }

 }
</style>

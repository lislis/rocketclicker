<script setup>
import { ref } from 'vue'

const props = defineProps(['clicks'])

</script>
<template>
    <ul class="clickhistory">
        <li v-for="click in clicks">{{click.by}} has clicked</li>
    </ul>
</template>

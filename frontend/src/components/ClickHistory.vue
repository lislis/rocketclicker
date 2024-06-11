<script setup>
import { ref, onMounted } from 'vue';

const props = defineProps(['clicks'])
const clickcontainer = ref(null)

onMounted(() => {
    //console.log(clickcontainer)
    let observer = new MutationObserver(scrollToBottom);// Tell it to look for new children that will change the height.
    const config = {childList: true};
    observer.observe(clickcontainer.value, config);

    function scrollToBottom() {
        clickcontainer.value.scrollTop = clickcontainer.value.scrollHeight;
    }   
})        


</script>
<template>
    <ul class="clickhistory" ref="clickcontainer">
        <li v-for="click in clicks"><strong>{{click.username}}</strong> clicked!</li>
    </ul>
</template>

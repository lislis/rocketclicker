import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import io from 'socket.io-client';

const app = createApp(App)

app.use(createPinia())
app.use(router)


const localIP = `${process.env.VUE_APP_SERVER_ADDRESS}`;
//const socketAddress = `ws://${process.env.VUE_APP_WS_ADDRESS}`;
app.provide('apiEndpoint', `${localIP}/api`);
//app.provide('socketServer', socketAddress);

const socket = io(localIP);
app.provide('socket', socket);

app.mount('#app')

import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import io from 'socket.io-client';

const app = createApp(App)

app.use(createPinia())
app.use(router)


if (process.env.NODE_ENV === 'production') {
  const localIP = `${process.env.VUE_APP_SERVER_ADDRESS}`;
  app.provide('apiEndpoint', `${localIP}/api`);
  const socket = io(localIP);
  app.provide('socket', socket);
} else {
  const localIP = 'http://localhost:3000';
  app.provide('apiEndpoint', `${localIP}/api`);
  const socket = io('http://localhost:3000');
  app.provide('socket', socket);
}



app.mount('#app')

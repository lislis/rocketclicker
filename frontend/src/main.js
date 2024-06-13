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
  app.provide('apiEndpoint', `/api`);
  const socket = io();
  app.provide('socket', socket);
} else {
  const localIP = 'http://localhost:3000';
  app.provide('apiEndpoint', `${localIP}/api`);
  const socket = io(localIP);
  app.provide('socket', socket);
}



app.mount('#app')

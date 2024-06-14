import { ref, computed, inject } from 'vue'
import { defineStore } from 'pinia'
import { wrappedFetch } from '@/utils';

export const useClickStore = defineStore('clicks', {
  state: () => ({
    me: {},
    users: [],
    clicks: [],
    game: null,
    myClicks: 0,
    candlesticks: []
  }),
  getters: {
    getMe(state) {
      return state.me;
    },
    getUsers: (state) => {
      return state.users;
    },
    getClicks: (state) => {
      return state.clicks;
    },
    getGame: (state) => {
      return state.game;
    },
    getMyClicks: (state) => {
      return state.myClicks;
    },
    getCandlesticks: (state) => {
      return state.candlesticks;
    }
  },
  actions: {
    setMe(newUser) {
      this.me = newUser;
    },
    fetchClicks() {
      let apiEndpoint = inject('apiEndpoint');
      wrappedFetch(`${apiEndpoint}/clicks`, 'GET', null)
        .then(d => d.json())
        .then(d => this.clicks = d);
    },
    fetchUsers() {
      let apiEndpoint = inject('apiEndpoint');
      wrappedFetch(`${apiEndpoint}/users`, 'GET', null)
        .then(d => d.json())
        .then(d => this.users = d);
    },
    fetchGame() {
      let apiEndpoint = inject('apiEndpoint');
      wrappedFetch(`${apiEndpoint}/games`, 'GET', null)
        .then(d => d.json())
        .then(d => this.game = d[0]);
    },
    addClick(click) {
      this.clicks.push(click);
    },
    addMyClick() {
      this.myClicks++;
    },
    rmAllClicks() {
      this.clicks = [];
    },
    newGame(game) {
      this.game = game;
    },
    rmGame() {
      this.game = null;
    },
    updateGame(game) {
      this.game = game;
    },
    addUser(user) {
      this.users.push(user);
    },
    rmUser(user) {
      let index = this.users.findIndex(x => x._id === user._id);
      this.users.splice(index, 1);
    },
    addCandlestick(stick) {
      this.candlesticks.push(stick);
    },
    resetCandlesticks() {
      this.candlesticks = [];
    }
  }

});

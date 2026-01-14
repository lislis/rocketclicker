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
    getJumpVal: (state) => {
      return state.game?.jump_value;
    },
    getMyClicks: (state) => {
      return state.myClicks;
    },
    getCandlesticks: (state) => {
      return state.candlesticks;
    },
    getCandlestickByIndex: (state) => {
      return (index) => state.candlesticks[index]
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
    updateGame(mewGame) {
      console.log(this.game, mewGame)
      Object.assign(this.game, mewGame);
      console.log(this.game, mewGame)
    },
    addUser(user) {
      this.users.push(user);
    },
    rmUser(user) {
      let index = this.users.findIndex(x => x._id === user._id);
      this.users.splice(index, 1);
    },
    updateLatestCandlestick(newData) {
      if (this.candlesticks.length) {
        let old = this.candlesticks[this.candlesticks.length -1]
        Object.assign(old, newData);
      }
    },
    addCandlestick(stick) {
      //console.log(this.candlesticks)
      this.candlesticks.push(stick);
    },
    resetCandlesticks() {
      //console.log(this.candlesticks)
      this.candlesticks = [];
      //console.log(this.candlesticks)
    }
  }

});

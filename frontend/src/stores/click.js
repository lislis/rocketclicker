import { ref, computed, inject } from 'vue'
import { defineStore } from 'pinia'

export const useClickStore = defineStore('clicks', {
  state: () => ({
    me: {},
    users: [],
    clicks: [],
    game: {},
    myClicks: []
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
    }
  },
  actions: {
    setMe(newUser) {
      this.me = newUser;
    },
    fetchClicks() {
      let apiEndpoint = inject('apiEndpoint');
      fetch(`${apiEndpoint}/clicks`)
        .then(d => d.json())
        .then(d => this.clicks = d);
    },
    fetchUsers() {
      let apiEndpoint = inject('apiEndpoint');
      fetch(`${apiEndpoint}/users`)
        .then(d => d.json())
        .then(d => this.users = d);
    },
    fetchGame() {
      let apiEndpoint = inject('apiEndpoint');
      fetch(`${apiEndpoint}/games`)
        .then(d => d.json())
        .then(d => this.game = d[0]);
    },
    addClick(click) {
      this.clicks.push(click);
    },
    rmAllClicks() {
      this.clicks = [];
    },
    newGame(game) {
      this.game = game;
    },
    rmGame() {
      this.game = {};
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
    }
  }

});

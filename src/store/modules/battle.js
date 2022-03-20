import Vue from "vue";

import { VIEW_CONSTANTS } from "../../constants";
import { getUser } from "../../api/github.api";

function initialState() {
  return {
    "players": [
      {
        "view": VIEW_CONSTANTS.PICK_USER,
        "user": {
          "id": 0,
          "login": ""
        },
      },
      {
        "view": VIEW_CONSTANTS.PICK_USER,
        "user": {
          "id": 1,
          "login": ""
        }
      }
    ],
    "errors": {}
  }
}

const state = initialState();

const getters = {
  players: (state) => state.players,
  errors: (state) => state.errors
}

const actions = {
  async fetchPlayerInfo({ commit }, formData) {
    return new Promise(async function(resolve, reject) {
      if (formData.username === "") {
        let data = {
          "error": "Username required.",
          "index": formData.index
        };
        commit("addError", data);
        reject();
      } else {
        getUser(formData.username).then(function(user) {
          if (user === null) {
            let data = {
              "error": "Invalid username",
              "index": formData.index
            };
            commit("addError", data);
            reject();
          } else {
            let player = {
              "view": VIEW_CONSTANTS.USER_PREVIEW,
              "user": user
            };
            let data = {
              "player": player,
              "index": formData.index
            }
            commit("setPlayer", data);
            commit("clearError", formData.index);
            resolve();
          }
        });
      }
    });
  },

  startBattle({ commit, state }) {
    let players = [];
    state.players.forEach(player => {
      let playerCopy = {
        "view": VIEW_CONSTANTS.BATTLE_RESULT,
        "user": player.user
      };
      players.push(playerCopy);
    });
    players.sort((player1, player2) => {
      return player2.user.score - player1.user.score;
    });
    commit("setPlayers", players);
  },

  resetPlayer({ commit }, index) {
    commit("clearPlayer", index);
  },

  resetState({ commit }) {
    commit("clearState"); 
  }
};

const mutations = {
  setPlayer: function(state, data) {
    state.players.splice([data.index], 1, data.player);
  },
  setPlayers: function(state, players) {
    state.players = players;
  },
  clearPlayer: function(state, index) {
    let player = {
      "view": VIEW_CONSTANTS.PICK_USER,
      "user": {
        "id": index,
        "login": ""
      }
    };
    state.players.splice(index, 1, player);
  },
  clearState: function(state) {
    let s = initialState();
    for (let [key, value] of Object.entries(s)) {
      state[key] = value;
    }
  },
  addError: function(state, data) {
    Vue.set(state.errors, data.index, data.error);
  },
  clearError: (state, index) => (delete state.errors[index])
}

export default {
  state,
  getters,
  actions,
  mutations
};

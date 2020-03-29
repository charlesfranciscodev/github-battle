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
    "errors": []
  }
}

const state = initialState();

const getters = {
  players: (state) => state["players"],
  errors: (state) => state["errors"]
}

const actions = {
  async fetchPlayerInfo({ commit }, formData) {
    return new Promise(async function(resolve, reject) {
      commit("clearErrors");
      if (formData["username"] === "") {
        commit("addError", "Username required.");
        reject();
      } else {
        getUser(formData["username"]).then(function(user) {
          if (user === null) {
            commit("addError", "Invalid username");
            reject();
          } else {
            let player = {
              "view": VIEW_CONSTANTS.USER_PREVIEW,
              "user": user
            };
            let data = {
              "player": player,
              "index": formData["index"]
            }
            commit("setPlayer", data);
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
    state["players"].splice([data["index"]], 1, data["player"]);
  },
  setPlayers: function(state, players) {
    state["players"] = players;
  },
  clearPlayer: function(state, index) {
    let player = {
      "view": VIEW_CONSTANTS.PICK_USER,
      "user": {
        "id": index,
        "login": ""
      }
    };
    state["players"].splice(index, 1, player);
  },
  clearState: function(state) {
    let s = initialState();
    for (let [key, value] of Object.entries(s)) {
      state[key] = value;
    }
  },
  clearErrors: (state) => (state["errors"] = []),
  addError: (state, error) => (state["errors"].push(error))
}

export default {
  state,
  getters,
  actions,
  mutations
};

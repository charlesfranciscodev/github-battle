import { VIEW_CONSTANTS } from "../../constants";
import { getUser } from "../../api/github.api";

const state = {
  "players": [
    {
      "view": VIEW_CONSTANTS.PICK_USER,
      "user": {
        "id": 0,
        "login": ""
      }
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

  resetPlayer({ commit }, index) {
    commit("clearPlayer", index); 
  }
};

const mutations = {
  setPlayer: function(state, data) {
    state["players"].splice([data["index"]], 1, data["player"]);
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
  clearErrors: (state) => (state["errors"] = []),
  addError: (state, error) => (state["errors"].push(error))
}

export default {
  state,
  getters,
  actions,
  mutations
};

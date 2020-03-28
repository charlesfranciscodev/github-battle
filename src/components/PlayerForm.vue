<template>
  <div class="column has-text-centered">
    <div v-if="player.view === 'PICK_USER'">
      <h3 class="subtitle is-3">
        Player {{ index + 1 }}
      </h3>
      <div>
        <input v-model="username" class="input username-input" type="text" placeholder="github username">
      </div>
      <button v-on:click="submitButtonClick" class="button is-black">
        Submit
      </button>
    </div>

    <div v-if="player.view === 'USER_PREVIEW' || player.view === 'BATTLE_RESULT'">
      <figure class="image is-128x128 image-centered">
        <img class="is-rounded" v-bind:src="player.user.avatarUrl">
      </figure>
      <h4 class="title is-4 user-login">@{{ player.user.login }}</h4>
    </div>

    <button v-if="player.view === 'USER_PREVIEW'" class="button is-danger is-light reset-button">
      Reset
    </button>

    <div v-if="player.view === 'BATTLE_RESULT'">
      <h5 class="title is-5">Score: 300000</h5>
      <p>Charles-Antoine Francisco</p>
      <p>Montreal, Canada</p>
      <p>Followers: 34</p>
      <p>Following: 17</p>
      <p>Public Repos: 63</p>
      <a href="https://charlesfranciscodev.github.io/">https://charlesfranciscodev.github.io/</a>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  "name": "PlayerForm",

  data() {
    return {
      "username": ""
    }
  },

  "props": ["index", "player"],

  "computed": mapGetters(["errors"]),

  "methods": {
    ...mapActions(["fetchPlayerInfo"]),

    async submitButtonClick() {
      try {
        let formData = {
          "username": this.username,
          "index": this.index
        }
        await this.fetchPlayerInfo(formData);
      } catch {
        console.error("fetchPlayerInfo error");
      }
    }
  }
};
</script>

<style scoped>
  .image-centered {
    margin: 1rem auto;
  }

  .username-input {
    max-width: 50%;
    margin-bottom: 1rem;
  }

  .user-login {
    margin-bottom: 1rem;
  }
</style>

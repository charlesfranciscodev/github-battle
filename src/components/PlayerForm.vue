<template>
  <div class="column has-text-centered">
    <div v-if="errors[index]" class="notification is-danger alert">
      {{ errors[index] }}
    </div>

    <div v-if="player.view === 'BATTLE_RESULT'">
      <h3 v-if="index === 0" class="subtitle is-3">Winner</h3>
      <h3 v-else class="subtitle is-3">Loser</h3>
    </div>

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

    <button v-on:click="resetPlayerButtonClick" v-if="player.view === 'USER_PREVIEW'" class="button is-danger is-light reset-button">
      Reset Player
    </button>

    <div v-if="player.view === 'BATTLE_RESULT'">
      <h5 class="title is-5">Score: {{ player.user.score }}</h5>
      <p>{{ player.user.name }}</p>
      <p>{{ player.user.location }}</p>
      <p>Followers: {{ player.user.followers.totalCount }}</p>
      <p>Following: {{ player.user.following.totalCount }}</p>
      <p>Public Repos: {{ player.user.repositories.nodes.length }}</p>
      <a v-bind:href="player.user.websiteUrl">{{ player.user.websiteUrl }}</a>
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
    ...mapActions(["fetchPlayerInfo", "resetPlayer"]),

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
    },

    resetPlayerButtonClick() {
      this.resetPlayer(this.index);
    }
  }
};
</script>

<style scoped>
  .input {
    max-width: 50%;
    margin-bottom: 1rem;
  }

  .user-login {
    margin-bottom: 1rem;
  }

  .alert {
    max-width: 50%;
    margin: 1rem auto;
  }
</style>

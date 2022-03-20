<template>
  <section class="section">
    <div class="container has-text-centered">
      <div class="columns">
        <player-form v-for="(player, index) in players" v-bind:player="player" v-bind:index="index" v-bind:key="player.user.id">
        </player-form>
      </div>

      <button v-on:click="battleButtonClick" v-if="players[0].view === 'USER_PREVIEW' && players[1].view === 'USER_PREVIEW'" class="button is-black">
        Battle
      </button>

      <button v-on:click="resetBattleButtonClick" v-if="players[0].view === 'BATTLE_RESULT'" class="button is-danger">
        Reset Battle
      </button>
    </div>
  </section>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

import PlayerForm from "../components/PlayerForm";

export default {
  name: "Battle",

  components: {
    "player-form": PlayerForm
  },

  "computed": mapGetters(["players"]),

  "methods": {
    ...mapActions(["startBattle", "resetState"]),

    battleButtonClick() {
      this.startBattle();
    },

    resetBattleButtonClick() {
      this.resetState();
    }
  }
}
</script>

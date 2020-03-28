<template>
  <section class="section">
    <div class="container has-text-centered">
      <div class="columns">
        <player-form v-for="(player, index) in players" v-bind:player="player" v-bind:index="index" v-bind:key="player.user.id">
        </player-form>
      </div>

      <button v-if="players[0].view === 'USER_PREVIEW' && players[1].view === 'USER_PREVIEW'" class="button is-black">
        Battle
      </button>
    </div>
  </section>
</template>

<script>
import { mapGetters } from "vuex";

import PlayerForm from "../components/PlayerForm";

export default {
  name: "Battle",

  components: {
    "player-form": PlayerForm
  },

  "computed": mapGetters(["players", "errors"]),
}
</script>

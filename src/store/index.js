import Vue from "vue";
import Vuex from "vuex";
import battle from "./modules/battle";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    battle
  }
});

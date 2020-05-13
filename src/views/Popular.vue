<template>
  <section class="section">
    <div class="container has-text-centered">
      <input v-model="language" v-on:change="fetchRepos" class="input" type="text" placeholder="programming language">

      <span v-on:click="fetchRepos" class="icon has-text-info is-medium">
        <i class="fas fa-sync fa-2x"></i>
      </span>

      <div class="columns is-multiline">
        <repo v-for="(repo, index) in repositories" v-bind:repo="repo" v-bind:index="index" v-bind:key="repo.id">
        </repo>
      </div>
    </div>
  </section>
</template>

<script>
import { fetchPopularRepos } from "../api/github.api";

import Repo from "../components/Repo";

export default {
  "name": "Popular",

  data() {
    return {
      "language": "all",
      "repositories": []
    }
  },

  created() {
    this.fetchRepos();
  },

  "methods": {
    fetchRepos() {
      fetchPopularRepos(this.language)
      .then(repos => this.repositories = repos)
      .catch(error => console.error(error));
    }
  },

  "components": {
    "repo": Repo
  }
}
</script>

<style scoped>
  .input {
    max-width: 25%;
    margin-bottom: 1rem;
  }

  .icon {
    margin-left: 1rem;
    cursor: pointer;
  }
</style>

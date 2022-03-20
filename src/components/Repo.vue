<template>
  <div class="column is-one-fifth-desktop is-one-third-tablet">
    <div class="content is-medium">
      #{{ index + 1}}
    </div>
    <figure class="image is-128x128 image-centered">
      <img class="is-rounded" v-bind:src="repo.node.owner.avatarUrl">
    </figure>
    <a v-bind:href="`https://github.com/${repo.node.owner.login}/${repo.node.name}`">
      {{ repo.node.name }}
    </a>
    <p>@{{ repo.node.owner.login }}</p>
    <p>{{ repo.node.stargazers.totalCount }} stars</p>
  </div>
</template>

<script>
export default {
  "name": "Repo",

  "props": ["index", "repo"],
}
</script>

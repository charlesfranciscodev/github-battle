<template>
  <div>
    <navbar></navbar>
    <router-view/>
  </div>
</template>

<script>
import Navbar from "./components/Navbar";

export default {
  name: "App",

  components: {
    "navbar": Navbar
  },
}
</script>

<style>
  .image-centered {
    margin: 1rem auto;
  }
</style>

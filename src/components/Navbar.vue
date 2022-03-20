<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a class="navbar-item" href="https://bulma.io">
        <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28">
      </a>

      <button role="button" class="navbar-burger burger" v-bind:class="classProperty" aria-label="menu" aria-expanded="false" data-target="links" v-on:click="toggleMenu">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </button>
    </div>

    <div id="links" class="navbar-menu" v-bind:class="classProperty">
      <div class="navbar-start">
        <router-link to="/" class="navbar-item">
          <span class="icon">
            <i class="fas fa-home"></i>
          </span>
          <span>
            Home
          </span>
        </router-link>

        <router-link to="/battle" class="navbar-item">
          <span class="icon">
            <i class="fas fa-user-friends"></i>
          </span>
          <span>
            Battle
          </span>
        </router-link>

        <router-link to="/popular" class="navbar-item">
          <span class="icon">
            <i class="fab fa-github"></i>
          </span>
          <span>
            Popular
          </span>
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navbar",

  data() {
    return {
      "isActive": false
    }
  },

  computed: {
    classProperty() {
      return {
        "is-active": this.isActive,
        "": !this.isActive
      }
    }
  },

  methods: {
    toggleMenu() {
      this.isActive = !this.isActive;
    }
  }
}
</script>

<template>
  <div id="app">
    <div class="nav">
  <input type="checkbox" id="nav-check">
  <div class="nav-header">
    <div class="nav-title">
      <router-link to="/"><div>Perfect squad</div></router-link>
    </div>
  </div>
  <div class="nav-btn">
    <label for="nav-check">
      <span></span>
      <span></span>
      <span></span>
    </label>
  </div>
  
  <div class="nav-links">
    <router-link to="/players">Players</router-link>
    <router-link to="/favorites">Favorites</router-link>
    <div id="Demo" class="w3-dropdown-content w3-bar-block w3-border"> Formations
    </div>
  </div>
  </div>
    <router-view/>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  name: "Home",
  data: function() {
    return {
    }
  },
  computed:{
    ...mapActions(['login']),
  },
  created() {
    this.login()
  } 
}
</script>

<style lang="scss">
$navcolor: green;

* {
  box-sizing: border-box;
  margin: 0;
}

.nav {
  height: 50px;
  width: 100%;
  background-color: $navcolor;
  position: fixed;
  z-index: 99;
}

.nav > .nav-header {
  display: inline;
}

.nav > .nav-header > .nav-title > a{
  display: inline-block;
  text-decoration: none;
  color: #efefef;
}

.nav > .nav-header > .nav-title {
  display: inline-block;
  font-size: 22px;
  color: #fff;
  padding: 10px 10px 10px 10px;
}

.nav > .nav-btn {
  display: none;
}

.nav > .nav-links {
  display: inline;
  float: right;
  font-size: 18px;
}

.nav > .nav-links > a {
  display: inline-block;
  padding: 13px 10px 13px 10px;
  text-decoration: none;
  color: #efefef;
}

.nav > .nav-links > div {
  display: inline-block;
  padding: 13px 10px 13px 10px;
  text-decoration: none;
  color: #efefef;
}

.nav > .nav-links > a:hover {
  background-color: rgba(0, 0, 0, 0.3);
}

.nav > .nav-links > div:hover {
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0.3);
}

.nav > #nav-check {
  display: none;
}

@media (max-width:800px) {
  .nav > .nav-btn {
    display: inline-block;
    position: absolute;
    right: 0px;
    top: 0px;
  }
  .nav > .nav-btn > label {
    display: inline-block;
    width: 50px;
    height: 50px;
    padding: 13px;
  }
  .nav > .nav-btn > label:hover,.nav  #nav-check:checked ~ .nav-btn > label {
    background-color: rgba(0, 0, 0, 0.3);
  }
  .nav > .nav-btn > label > span {
    display: block;
    width: 25px;
    height: 10px;
    border-top: 2px solid #eee;
  }
  .nav > .nav-links {
    position: absolute;
    display: block;
    width: 100%;
    background-color: #333;
    height: 0px;
    transition: all 0.3s ease-in;
    overflow-y: hidden;
    top: 50px;
    left: 0px;
  }
  .nav > .nav-links > a {
    display: block;
    width: 100%;
  }

  .nav > .nav-links > div {
    display: block;
    width: 100%;
  }

  .nav > #nav-check:not(:checked) ~ .nav-links {
    height: 0px;
  }
  .nav > #nav-check:checked ~ .nav-links {
    height: calc(100vh - 50px);
    overflow-y: auto;
  }
}
</style>

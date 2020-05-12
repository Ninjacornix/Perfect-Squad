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
    <div class="formations">Formations
      <div class="things">
        <ul>
          <li v-for="index in this.$store.state.store.formations" :key="index.id" ><a @click="log">{{index.formation}}</a></li>
        </ul>
      </div>
    </div>
  </div>
  </div>
    <router-view v-bind:pinfo="pinfo" v-bind:formation="formation"/>
  </div>
</template>
<script>
export default {
  name: "Home",
  created() {
    this.$store.dispatch("login");
  },
  data: function(){
    return{
      formation: "",
      pinfo: ""
    }
  },
  methods: {
    log(event){
      const save = event.target.innerHTML;
      for(const index in this.$store.state.store.formations){
        if(save === this.$store.state.store.formations[index].formation){
          this.formation = this.$store.state.store.formations[index].positions;
        }
      }
      this.pinfo = "function info()"
    },
  }
}
</script>

<style lang="scss">
$navcolor: green;
#app{
  height: 100%;
}

* {
  box-sizing: border-box;
  margin: 0;
  font-family: 'Roboto';
}
@font-face {
  font-family: Roboto;
  src: url("../src/assets/Roboto-Medium.ttf");
}

.nav {
  padding-left: 3%;
  padding-right: 3%;
  height: 50px;
  width: 100%;
  background-color: #1C7523;
  position: fixed;
  z-index: 99;
  font-family: Roboto;
}


.formations ul {
  text-align: center;
  position: relative;
  margin-top: 15px;
  margin-left: -9px;
  width: 111px;
  list-style-type: none;
  padding: 0;
  position: absolute;
}

.formations a{
  display: block;
  padding: 10px;
  text-decoration: none;
  background-color: #1C7523;
}
.things {
  display: none;
  max-height: 0;
  overflow: hidden;
}

.content {
  display: block;
  float: left;
  text-align: left;
  height: 15px;
  padding: 10px;
}

.formations:hover .things{
  max-height: 100%;
  display: block;
}

.nav > .nav-header {
  display: inline;
}

.nav > .nav-header > .nav-title > a{
  text-decoration: none;
  color: #efefef;
}

.nav > .nav-header > .nav-title {
  display: inline-block;
  font-size: 22px;
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

@media screen and (max-width:600px) {
  .formations ul{
    width: 100%;
  }
  .nav {
    width: 100%;
  }
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
  .formations a{
    background: rgba(0, 0, 0, 0.3);
    width: 100%;
}
}
</style>

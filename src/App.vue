<template>
  <div id="app" @click="removedropdown">
    <div class="nav">
  <input type="checkbox" id="nav-check">
  <div class="nav-header">
    <div class="nav-title">
      <div>Perfect squad</div>
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
    <router-link to="/">Favorites</router-link>
    <div class="formations" @click="showdropdown">
      <div>Formation: </div> 
      <div class="next_to_formations"><i id="selected_formation">none-selected</i> 
          <div class="things">
          <ul>
            <li v-for="index in this.$store.state.store.formations" :key="index.id" ><a @click="log">{{index.formation}}</a></li>
          </ul>
        </div>
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
    showdropdown(){
      const element = document.querySelector(".things");
      const element2 = document.querySelector(".show");
      if(element){
        element.classList.remove("things")
        element.classList.add('show');
      } else if(element2){
        element2.classList.remove("show")
        element2.classList.add('things');
      }
    },
    log(event){
      const save = event.target.innerHTML;
      for(const index in this.$store.state.store.formations){
        if(save === this.$store.state.store.formations[index].formation){
          this.formation = this.$store.state.store.formations[index].positions;
          document.getElementById("selected_formation").innerHTML = this.$store.state.store.formations[index].formation;
        }
      }
      this.pinfo = "function info()"
    },
    removedropdown(e){
      if(!e.target.matches(".formations") && !e.target.matches(".next_to_formations") && !e.target.matches("#selected_formation")){
        const elem = document.querySelector(".show");
        if(elem){
          elem.classList.remove("show");
          elem.classList.add("things");
        }
      }
    }
  }
}
</script>

<style lang="scss">
$navcolor: green;
#app{
  height: 100%;
  min-height: 100%;
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
  background-color: #203C00;
  padding-left: 3%;
  padding-right: 3%;
  height: 50px;
  width: 100%;
  position: fixed;
  z-index: 10;
  font-family: Arial;
}

#selected_formation{
  text-align: center;
}

.show {
  max-height: 100%;
  display: block;
}

.formations {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.formations ul {
  text-align: center;
  margin-top: 15px;
  width: 120px;
  display: flex;
  flex-direction: column;
  list-style-type: none;
  padding: 0;
  position: absolute;
}

.formations a{
  display: block;
  padding: 10px;
  text-decoration: none;
  background-color: #203C00;
}

.formations a:hover{
  color: gold;
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
  width: 100%;
}

.next_to_formations{
  display: flex;
  width: 120px;
  flex-direction: column;
}

.nav > .nav-header {
  display: inline;
}

.nav > .nav-header > .nav-title > div{
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
  display: flex;
  flex-basis: auto;
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

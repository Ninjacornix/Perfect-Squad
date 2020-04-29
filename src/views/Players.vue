<template>
  <div id="players">
    <div class="row">
      <div class="column">
        <div id="name">GK</div>
        <div id="content">
          <div class="player" v-for="player in this.GK" :key="player.id" @click="showInfo"> <label class="name"><strong>{{ player.name}} {{ player.lastName }}</strong></label> <label class="postiton">{{ player.stats.position }}</label></div>
        </div>
      </div>
      <div class="column">
        <div id="name">DEF</div>
        <div id="content">
          <div class="player" v-for="player in this.DEF" :key="player.id" @click="showInfo"><label class="name"><strong>{{ player.name}} {{ player.lastName }}</strong></label> <label class="postiton">{{ player.stats.position }}</label></div>
        </div>
      </div>
      <div class="column">
        <div id="name">MID</div>
        <div id="content">
          <div class="player" v-for="player in this.MID" :key="player.id" @click="showInfo"><label class="name"><strong>{{ player.name}} {{ player.lastName }}</strong></label> <label class="postiton">{{ player.stats.position }}</label></div>
        </div>
      </div>
      <div class="column">
        <div id="name">ATT</div>
        <div id="content">
          <div class="player" v-for="player in this.ATT" :key="player.id" @click="showInfo"><label class="name"><strong>{{ player.name}} {{ player.lastName }}</strong></label> <label class="postiton">{{ player.stats.position }}</label></div>
        </div>
      </div>
    </div>
    <div id="myModal" class="modal">
      <div class="modal-content">
        <span class="close">&times;</span>
        <div class="popuprow">
          <div class="popupcolumnr">
            <div><div id="playerinfo"></div></div>
            <span class="dot"></span>
            <img id="playerpic">
            <div class="nacionality"><label id="country"></label><img id="flag"></div>
            <div class="club"><label id="club"></label><img id="logo"></div>
            <div class="date">Birth date<label id="year"></label></div>
            <div class="ppos">Preferred positions<label id="playerpos"></label></div>
            <div class="pospos">Positions<label id="pos"></label></div>
            <div class="value">Value<label id=""></label></div>
          </div>
          <div class="popupcolumnl">
           
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: function() {
      return {
        GK: [],
        DEF: [],
        MID: [],
        ATT: [],
      }
  },
  mounted(){
    for(let i = 0; i < this.$store.state.store.players.length; i++){
        if(this.$store.state.store.players[i].stats.position === "GK"){
          this.GK.push(this.$store.state.store.players[i]);
        }
      }
      for(let i = 0; i < this.$store.state.store.players.length; i++){
        if(this.$store.state.store.players[i].stats.position === "CB" ||
           this.$store.state.store.players[i].stats.position === "LB" ||
           this.$store.state.store.players[i].stats.position === "RB"){
          this.DEF.push(this.$store.state.store.players[i]);
        }
      }
      for(let i = 0; i < this.$store.state.store.players.length; i++){
        if(this.$store.state.store.players[i].stats.position === "DM" ||
           this.$store.state.store.players[i].stats.position === "CM" ||
           this.$store.state.store.players[i].stats.position === "LM" ||
           this.$store.state.store.players[i].stats.position === "RM" ||
           this.$store.state.store.players[i].stats.position === "AM"){
          this.MID.push(this.$store.state.store.players[i]);
        }
      }
      for(let i = 0; i < this.$store.state.store.players.length; i++){
        if(this.$store.state.store.players[i].stats.position === "CF" ||
           this.$store.state.store.players[i].stats.position === "LW" ||
           this.$store.state.store.players[i].stats.position === "RW"){
          this.ATT.push(this.$store.state.store.players[i]);
        }
      }
  },
  methods: {
    showInfo(e) {
      if(e.target.tagName === "DIV"){
        const player = e.target.firstElementChild.firstElementChild.innerHTML.split(" ")[0];
        for(let i = 0; i < this.$store.state.store.players.length; i++){
          if(this.$store.state.store.players[i].name.includes(player)){
            this.info(this.$store.state.store.players[i])
          }
        }
      } else if(e.target.tagName === "STRONG"){
        const player = e.target.innerHTML.split(" ")[0];
        for(let i = 0; i < this.$store.state.store.players.length; i++){
          if(this.$store.state.store.players[i].name.includes(player)){
            this.info(this.$store.state.store.players[i])
          }
        }
      } else if(e.target.tagName === "LABEL"){
        const player = e.target.previousElementSibling.firstElementChild.innerHTML.split(" ")[0];
        for(let i = 0; i < this.$store.state.store.players.length; i++){
          if(this.$store.state.store.players[i].name.includes(player)){
            this.info(this.$store.state.store.players[i])
          }
        }
      }
    },
    info(player){
        const skills = player.playerSkills;

        //left side
        const modal = document.getElementById("myModal");
        const span = document.getElementsByClassName("close")[0];
        const nacionality = document.getElementById("country");
        const flag = document.getElementById("flag");
        const club = document.getElementById("club");
        const logo = document.getElementById("logo");
        const year = document.getElementById("year");
        const playerpos = document.getElementById("playerpos");
        const pos = document.getElementById("pos");
        document.getElementById("playerinfo").innerHTML = "<strong>" + player.name + " " + player.lastName + "</strong>";
        modal.style.display = "block";
        const pic = player.formationPicture;
        const picture = document.getElementById("playerpic");
        nacionality.innerHTML = player.nationality;
        flag.src = player.nationalityFlag;
        club.innerHTML = player.stats.club;
        logo.src = player.teamCrest;
        picture.src = pic;
        picture.style.clear = "both";
        picture.style.width = "50px";
        picture.style.height = "50px";
        year.innerHTML = player.stats.birthDate;
        playerpos.innerHTML = player.stats.position;
        pos.innerHTML = player.stats.posiblePositions;

        //right side
        const element = document.querySelector(".popupcolumnl");
        for(const skill in skills){
          const skillthings = document.createElement("div");
          skillthings.innerHTML = skills[skill].name;
          for(const subskill in skills[skill].skills){
            console.log(skills[skill].skills[subskill].name)
            const subskillthings = document.createElement("div");
            subskillthings.innerHTML = skills[skill].skills[subskill].name;
            skillthings.appendChild(subskillthings)
          }
          element.appendChild(skillthings);
        }

        span.onclick = function() {
          modal.style.display = "none";
          element.innerHTML = " ";
        }
        window.onclick = function(event) {
          if (event.target == modal) {
            modal.style.display = "none";
            element.innerHTML = " ";
          }
        }
      }
  }
}
</script>

<style>
#players {
  position: absolute;
  top: 0;
  padding-top: 10px;
  background: url("../assets/background.jpg") no-repeat center center fixed;
  background-size: cover;
  height: 100%;
  width: 100%;
}

.row {
  padding-top: 40px;
}

.column {
  float: left;
  width: 25%;
}

.modal {
  display: none;
  width: 100%; 
  height: 100%; 
  position: fixed; 
  z-index: 2;
  left: 0;
  top: 0;
  overflow: auto; 
  background-color: rgb(0,0,0); 
  background-color: rgba(0,0,0,0.4); 
}

.modal-content {
  background-color: silver;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
}

.popuprow{
  column-count: 2;
}

.popupcolumnr {
  display: table-cell;
  float: left;
  width: 100%;
  border-right: 2px solid black;
}

.nacionality {
  display: inline-block;
}

.dot {
  height: 25px;
  width: 25px;
  background-color: green;
  border-radius: 50%;
  display: inline-block;
}

.popupcolumnl {
  display: table-cell;
  height: 40px;
  width: 100%;
  float: left;
}


.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

#name {
  text-align: center;
  background-color: silver;
  border-left: 1px solid black ;
  height: 5%;
}

.player {
  position: relative;
  text-align: center;
  padding: 2%;
  background-color: silver;
  margin: 10px 15px 5px 15px;
  z-index: 1;
}

.player > .name {
  position: relative;
  text-align: center;
  vertical-align: middle;
}

.player > .postiton {
  float: right;
}

@media (max-width:800px){
  .column{
    width: 100%;
    border-bottom: 1px solid black;
  }
}


</style>
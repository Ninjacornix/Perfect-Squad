<template>
  <div id="players">
    <div class="row">
      <div class="column">
        <div id="name">GK</div>
        <div id="content">
          <div class="player" v-for="player in this.GK" :key="player.id" @click="showInfo"><fa-icon id="heart" v-if="$store.getters.isInFav(player)" icon="heart" :style="{ color: '#B94040', top: '50%' }"></fa-icon><fa-icon id="heart" v-else icon="heart" :style="{ color: '#9E9C9C', top: '50%' }"></fa-icon><label class="name"><strong>{{ player.name}} {{ player.lastName }}</strong></label><label class="postiton">{{ player.stats.position }}</label></div>
        </div>
      </div>
      <div class="column">
        <div id="name">DEF</div>
        <div id="content">
          <div class="player" v-for="player in this.DEF" :key="player.id" @click="showInfo"><fa-icon id="heart" v-if="$store.getters.isInFav(player)" icon="heart" :style="{ color: '#B94040' }"></fa-icon><fa-icon id="heart" v-else icon="heart" :style="{ color: '#9E9C9C' }"></fa-icon><label class="name"><strong>{{ player.name}} {{ player.lastName }}</strong></label> <label class="postiton">{{ player.stats.position }}</label></div>
        </div>
      </div>
      <div class="column">
        <div id="name">MID</div>
        <div id="content">
          <div class="player" v-for="player in this.MID" :key="player.id" @click="showInfo"><fa-icon id="heart" v-if="$store.getters.isInFav(player)" icon="heart" :style="{ color: '#B94040' }"></fa-icon><fa-icon id="heart" v-else icon="heart" :style="{ color: '#9E9C9C' }"></fa-icon><label class="name"><strong>{{ player.name}} {{ player.lastName }}</strong></label> <label class="postiton">{{ player.stats.position }}</label></div>
        </div>
      </div>
      <div class="column">
        <div id="name">ATT</div>
        <div id="content">
          <div class="player" v-for="player in this.ATT" :key="player.id" @click="showInfo"><fa-icon id="heart" v-if="$store.getters.isInFav(player)" icon="heart" :style="{ color: '#B94040' }"></fa-icon><fa-icon id="heart" v-else icon="heart" :style="{ color: '#9E9C9C' }"></fa-icon><label class="name"><strong>{{ player.name}} {{ player.lastName }}</strong></label> <label class="postiton">{{ player.stats.position }}</label></div>
        </div>
      </div>
    </div>
    <div id="myModal" class="modal">
      <div class="modal-content">
        <span class="close">&times;</span>
        <div class="popuprow">
          <div class="popupcolumnr">
            <div id="playerinfo"></div>
            <div id="pinfo">
              <img id="playerpic">
              <span id="dot"></span>
            </div>
            <div><div><div id="rating">{{this.player_rate}}</div><div>/5</div></div><div class="stars"><fa-icon @click="starc" icon="star" style="order: 5"></fa-icon><fa-icon @click="starc" icon="star" style="order: 4"></fa-icon><fa-icon @click="starc" icon="star" style="order: 3"></fa-icon><fa-icon @click="starc" icon="star" style="order: 2"></fa-icon><fa-icon @click="starc" icon="star" style="order: 1"></fa-icon></div></div>
            <div><label id="country"></label><img id="flag"></div>
            <div><label id="club"></label><img id="logo"></div>
            <div>Height<label id="pheight"></label></div>
            <div>Weight<label id="pweight"></label></div>
            <div>Birth date<label id="year"></label></div>
            <div>Age<label id="realage"></label></div>
            <div>Preferred positions<label id="playerpos"></label></div>
            <div>Positions<label id="pos"></label></div>
            <div>Preferred Foot<label id="foot"></label></div>
            <div>Value<label id="money"></label></div>
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
        star: "",
        player_rate: ""
      }
  },
  mounted(){
    for(let i = 0; i < this.$store.state.store.players.length; i++){
        if(this.$store.state.store.players[i].stats.position === "GK"){
          this.$store.state.store.players[i].marks = [];
          this.$store.state.store.players[i].result = "";
          this.GK.push(this.$store.state.store.players[i]);
        }
      }
      for(let i = 0; i < this.$store.state.store.players.length; i++){
        if(this.$store.state.store.players[i].stats.position === "CB" ||
           this.$store.state.store.players[i].stats.position === "LB" ||
           this.$store.state.store.players[i].stats.position === "RB"){
          this.$store.state.store.players[i].marks = [];
          this.$store.state.store.players[i].result = "";
          this.DEF.push(this.$store.state.store.players[i]);
        }
      }
      for(let i = 0; i < this.$store.state.store.players.length; i++){
        if(this.$store.state.store.players[i].stats.position === "DM" ||
           this.$store.state.store.players[i].stats.position === "CM" ||
           this.$store.state.store.players[i].stats.position === "LM" ||
           this.$store.state.store.players[i].stats.position === "RM" ||
           this.$store.state.store.players[i].stats.position === "AM"){
          this.$store.state.store.players[i].marks = [];
          this.$store.state.store.players[i].result = "";
          this.MID.push(this.$store.state.store.players[i]);
        }
      }
      for(let i = 0; i < this.$store.state.store.players.length; i++){
        if(this.$store.state.store.players[i].stats.position === "CF" ||
           this.$store.state.store.players[i].stats.position === "LW" ||
           this.$store.state.store.players[i].stats.position === "RW"){
          this.$store.state.store.players[i].marks = [];
          this.$store.state.store.players[i].result = "";
          this.ATT.push(this.$store.state.store.players[i]);
        }
      }
  },
  methods: {
    showInfo(e) {
      if(e.target.tagName === "DIV"){
        const player = e.target.children[1].firstElementChild.innerHTML.split(" ")[0];
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
      }
    },
    info(player){
        if(player.marks.length >= 1){
          this.player_rate = player.result;
        } else {
          this.player_rate = 0;
        }
        const skills = player.playerSkills;
        this.star = player;
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
        const money = document.getElementById("money");
        const pheight = document.getElementById("pheight");
        const pweight = document.getElementById("pweight");
        const realage = document.getElementById("realage");
        const foot = document.getElementById("foot");
        const date = new Date(player.stats.birthDate);
        const current_date = new Date();
        const age = current_date.getFullYear() - date.getFullYear();
        document.getElementById("playerinfo").innerHTML = "<strong>" + player.name + " " + player.lastName + "</strong>";
        document.getElementById("dot").innerHTML = player.stats.position;
        modal.style.display = "block";
        const pic = player.formationPicture;
        const picture = document.getElementById("playerpic");
        nacionality.innerHTML = player.nationality;
        money.innerHTML = player.stats.value; 
        flag.src = player.nationalityFlag;
        club.innerHTML = player.stats.club;
        logo.src = player.teamCrest;
        picture.src = pic;
        year.innerHTML = player.stats.birthDate;
        playerpos.innerHTML = player.stats.position;
        pos.innerHTML = player.stats.posiblePositions;
        pheight.innerHTML = player.stats.height;
        pweight.innerHTML = player.stats.weight;
        realage.innerHTML = age;
        foot.innerHTML = player.stats.preferredFoot;

        //right side
        const element = document.querySelector(".popupcolumnl");
        for(const skill in skills){
          const skillthings = document.createElement("div");
          const specials = document.createElement("div");
          const string_for_capitalize = skills[skill].name.toLowerCase().split(' ').map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join(' ');
          skillthings.innerHTML = "<div class='skill_main'>" + string_for_capitalize  + "</div>";
          if(skills[skill].name != "specialities"){
            for(const subskill in skills[skill].skills){
              const subskillthings = document.createElement("div");
              const progress = document.createElement("progress");
              const subskill_name = document.createElement("div");
              progress.className = "progbar"
              progress.max = "100";
              progress.value = skills[skill].skills[subskill].value;
              subskill_name.innerHTML = skills[skill].skills[subskill].name.toLowerCase().split(' ').map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join(' ');
              subskillthings.classList.add("skill_things");
              subskillthings.appendChild(subskill_name);
              subskillthings.appendChild(progress);
              skillthings.appendChild(subskillthings);
            }
          } else {
            for(const speciality in skills[skill].skills){
              const special = document.createElement("div");
              special.innerHTML = skills[skill].skills[speciality].name;
              special.className = "speci";
              special.classList.add("skill_things");
              specials.appendChild(special);
            }
          }
          element.appendChild(skillthings);
          element.appendChild(specials);
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
      },
  starc(){
    const rate = event.target.parentElement.style.order;
    const player_name = document.getElementById("playerinfo").firstElementChild.innerHTML.split(" ");
    let playerName;
    let playerSurname;
    if(player_name[1]  === "Jr"){
      playerName = player_name.join(" ");
      playerSurname = "";
    } else {
      playerName = player_name[0];
      player_name.shift();
      playerSurname = player_name.join(" ");
    }
    console.log(playerName)
    this.$store.commit("starCalculate", {name: playerName, surname: playerSurname, star: rate});
    for(let pName in this.$store.state.store.players){
      if(this.$store.state.store.players[pName].name === playerName && this.$store.state.store.players[pName].lastName === playerSurname){
        this.player_rate = this.$store.state.store.players[pName].result;
      } else if(playerName.includes("Neymar Jr") && this.$store.state.store.players[pName].name.includes("Neymar Jr")){
        console.log("hi")
        this.player_rate = this.$store.state.store.players[pName].result;
      }
    }
  },
  isInfav(n){
    if(this.$store.state.favs){
      return this.$store.state.favs.includes(n);
    }
  },
  },
}
</script>

<style>
#players {
  position: absolute;
  top: 0;
  padding-top: 10px;
  background: url("../assets/background.jpg") no-repeat center center fixed;
  background-size: cover;
  min-height: 100%;
  width: 100%;
}
#playerinfo{
  justify-content: center;
  text-align: center;
}

.row {
  padding: 40px 5% 0 5%;
}

.column {
  float: left;
  width: 25%;
  height: 15%;
}

.modal {
  display: none;
  width: 100%; 
  height: 100%; 
  position: fixed; 
  z-index: 11;
  left: 0;
  top: 0;
  overflow: auto; 
  background-color: rgb(0,0,0); 
  background-color: rgba(0,0,0,0.8); 
}

#playerpic{
  width: 75px;
  height: 75px;
}

.modal-content {
  background-color: #DFDFDF;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
}

.popuprow:after {
  content: "";
  display: table;
  clear: both;
}

.popupcolumnr {
  padding: 20px;
  float: left;
  width: 50%;
  display: inline-block;
}

.popupcolumnr div{
  display: flex;
  justify-content: space-between;
}


.speci{
  text-align: center;
}


.skill_main{
  line-height: 35px;
  vertical-align: middle;
  height: 35px;
  margin-top: 10px;
  padding-left: 5%;
  background-color: rgba(255,255,255, 0.3);
}

.skill_things{
  display: inline-flex;
  width: 100%;
}

.progbar{
  width: 100%;
  height: 10px;
  border-radius: 25%;
  vertical-align: baseline;
}

#dot {
  display: block;
  height: 35px;
  width: 35px;
  background-color: green;
  border-radius: 50%;
  display: inline-block;
  text-align: center;
  line-height: 35px;
}

.popupcolumnl {
  border-right: 2px solid #838484;
  padding: 20px;
  padding-top: 0;
  width: 50%;
  float: left;
  border-left: 2px solid #838484;
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
  background-color: #DFDFDF;
  border-left: 1px solid black ;
  height: 5%;
  box-shadow: 0px 2px 4.9px 0.1px rgba(0, 0, 0, 0.4);
}

.player {
  position: relative;
  text-align: center;
  padding: 2%;
  background-color: #DFDFDF;
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

#heart{
  float: left;
}

.stars{
  display: flex;
}

@media screen and (max-width:800px){
  #players{
    min-height: 100%;
  }
  .popupcolumnr {
    width: 100%;
  }
  .popupcolumnl {
    width: 100%;
    border-left: none;
    border-top: 2px solid lightgray;
  }
  #players{
    position: absolute;
  }
  .column{
    width: 100%;
    border-bottom: 1px solid black;
  }
}


</style>
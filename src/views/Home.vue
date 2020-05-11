<template>
  <div class="home">
    <div class="field">
      <div @click="pinfo" id="CF"></div>
      <div class="upper">
      <div @click="pinfo" id="LW"></div>
      <div @click="pinfo" id="AM"></div>
      <div @click="pinfo" id="RW"></div>
      </div>
      <div class="middle">
        <div @click="pinfo" id="LM"></div>
        <div @click="pinfo" id="CM"></div>
        <div @click="pinfo" id="RM"></div>
      </div>
      <div @click="pinfo" id="DM"></div>
      <div class="back">
        <div @click="pinfo" id="LB"></div>
        <div @click="pinfo" id="CB"></div>
        <div @click="pinfo" id="RB"></div>
      </div>
      <div @click="pinfo" id="GK"></div>
    </div>
    <div id="myModal" class="popup">
    <div class="popup-content">
      <div id="info_row"></div>
      <div id="selection_row"><div id="pop" @click="sort_pop">Popularity</div><div id="val" @click="sort_value">Value</div><div id="age" @click="sort_age">Age</div></div>
      <div class="player_section">
        <div class="player_info" v-for="player in this.players" :key="player.id">
          <div class="pdata"><img class="team_img" v-bind:src="player.teamCrest"><div class="player_name">{{player.name}} {{player.lastName}}</div></div>
          <img class="player_image" v-bind:src="player.playerPicture">
          <div class="add_favs">
            <fa-icon icon="heart-broken" @click="removefromfav(player)" id="remove_fav_player"></fa-icon>
            <fa-icon icon="heart" @click="addtofav(player)" id="fav_player"></fa-icon>  
          </div>
        </div>
      </div>
    </div>
  </div>
  <div id="players_pictures_home"></div>
  </div>
</template>

<script>
export default {
  data: function(){
    return {
      positions: ["CF","LW","AM","RW","LM","CM","RM","DM","LB","CB","RB","GK"],
      players: [],
      change: "",
      element: [],
      player_order: ""
    }
  },
  watch: {
    formation(){
      let positions = this.positions;
      for(let i = 0; i < positions.length; i++){
        document.getElementById(positions[i]).innerHTML = "";
      }
      for(let pos in this.formation){
        for(let i = 0; i < positions.length; i++){
          if(pos.includes(positions[i].toLowerCase())){
            for(let j = 0; j < this.formation[pos]; j++){4
              const elem = document.getElementById(positions[i]);
              const player = document.createElement("div");
              player.className = "playerformation";
              player.style.order = j + 1;
              elem.appendChild(player);
            }
          }
      } 
    }
    const elem = document.getElementById("GK");
    const player = document.createElement("div");
    player.className = "playerformation";
    elem.appendChild(player);
    }
  },
  methods: {
    pinfo(e){
      e.stopPropagation();
      this.player_order = e.target.style.order;
      if(e.target.className === "playerformation"){
        if(this.players.length >= 1 ){
          this.players = [];
        }
      const modal = document.getElementById("myModal");
      const player = e.target.parentElement.id;
      if(this.element.length >= 1 ){
        this.element = []
      }
      this.change = e.target.parentElement.id;
      document.getElementById("info_row").innerHTML = player;
      for(let i = 0; i < this.$store.state.store.players.length; i++){
        for(let j = 0; j < this.$store.state.store.players[i].stats.posiblePositions.length; j++){
          if(this.$store.state.store.players[i].stats.posiblePositions[j] === player){
            this.players.push(this.$store.state.store.players[i]);
          }
        }
      }
      e.target.remove();
      modal.style.display = "block";
      }
    },
    addtofav(player){
      const modal = document.getElementById("myModal");
      const pos = document.getElementById(this.change);
      this.change = player.formationPicture;
      this.$store.commit("favoritesadd", player);
      const player_pic = document.createElement("img");
      player_pic.src = this.change;
      player_pic.className = "player_images_mini"
      player_pic.style.order = this.player_order;
      pos.appendChild(player_pic);
      if(this.$store.state.favs.includes(player)){
        modal.style.display = "none";
      }
    },
    removefromfav(player){
      this.$store.commit("favoritesremove", player);
    },
    sort_pop(){
      return this.players.sort((a,b) => a.result - b.result);
      
    },
    sort_value(){
      return this.players.sort((a,b) => Number(a.stats.value.replace(/\D/g,'')) - Number(b.stats.value.replace(/\D/g,'')));
    },
    sort_age(){
      const date = new Date();
      const year = date.getFullYear();
      return this.players.sort((a,b) => (new Date(a.stats.birthDate).getFullYear() - year) - (new Date(b.stats.birthDate).getFullYear() - year));
    }
  },
    props: ["formation"]
  }
</script>
<style lang="scss">
html, body { height: 100% }

.home {
  position: relative;
  top: 0;
  padding-top: 10px;
  background: url("../assets/background.jpg") no-repeat center center fixed;
  background-size: cover;
  width: 100%;
  min-height: 100%;
}

.field {
  position: relative;
  width: 400px;
  height: 570px;
  margin: auto;
  margin-top: 45px;
  margin-bottom: 5px;
  background: url("../assets/field.jpg") no-repeat;
  background-size: cover;
  background-size: 100%;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
}

// MODAL
.popup {
  display: none;
  width: 100%; 
  height: 100vh; 
  position: fixed; 
  z-index: 2;
  left: 0;
  top: 0;
  overflow: auto; 
  background-color: rgb(0,0,0); 
  background-color: rgba(0,0,0,0.4); 
}

#info_row{
  text-align: center;
  background-color: lightgray;
  width: 100%;
}

.pdata{
  display: flex;
  justify-content: space-between;
  background-color: gray;
}

.popup-content {
  background: url("../assets/background.jpg") no-repeat center center fixed;
  background-size: cover;
  margin-top: 2.5%;
  min-width: 100%;
  padding-top: 0.5%;
  border: 1px solid #888;
  min-height: 100%;
}

#remove_fav_player{
  width: 25px;
  height: 25px;
}

#fav_player{
  width: 25px;
  height: 25px;
}

#selection_row{
  display: flex;
  background-color: gray;
}

#val{
  cursor: pointer;
  padding-right: 40px;
}

#pop{
  cursor: pointer;
}

#age{
  cursor: pointer;
}

#selection_row > div{
  margin: 0 auto;
}

.team_img{
  float: left;
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
  z-index: 2;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

// AREAS
#CF{
  margin: 20% auto 0 auto;
  width: 35%;
  height: 13%;
  display: flex;
}

.upper{
  margin: 0 auto;
  width: 82%;
  height: 13%;
  display: flex;
}

#LW{
  width: 25%;
  height: 100%;
}

#AM{
  display: flex;
  width: 50%;
  height: 100%;
}

#RW{
  width: 25%;
  height: 100%;
}

.middle{
  margin: 0 auto ;
  width: 82%;
  height: 17%;
  display: flex;
}

#LM{
  width: 25%;
  height: 100%;
}

#CM{
  padding-top: 3vh;
  width: 50%;
  height: 100%;
  display: flex;
}

#RM{
  width: 25%;
  height: 100%;
}

#DM{
  margin: 0 auto;
  width: 40%;
  height: 13%;
}

.back{
  margin: 0 auto;
  width: 82%;
  height: 15%;
  display: flex;
}

#LB{
  width: 25%;
  height: 100%;
}

#CB{
  padding-top: 25px;
  width: 50%;
  height: 100%;
  display: flex;
}

#RB{
  width: 25%;
  height: 100%;
}

#GK{
  padding-top: 10px;
  width: 25%;
  height: 10%;
  margin: 0 auto 0 auto;
  display: flex;
}

.playerformation{
  border: 3px solid white;
  margin: auto;
  height: 25px;
  width: 25px;
  background-color: #FD5F00;
  border-radius: 50%;
}

.player_section{
  position: absolute;
  top: 30%;
  max-height: 50%;
  display: flex;
  align-self: center;
}

.player_info{
  display: flex;
  flex-direction: column;
  position: relative;
  text-align: center;
  padding: 2%;
  margin: 0 auto;
  min-height: 100%;
  width: 100%;
  flex: 0.1 0.1 200px;
}

.player_name{
  margin: auto;
  align-content: center;
  background-color: gray;
}

.player_image{
  width: 100%;
  height: 75%;
}

.add_favs{
  max-width: 100%;
  align-content: center;
  display: flex;
  justify-content: space-between;
  background-color: gray;
}

#players_pictures_home{
  width: 100%;
  height: 100%;
}

.player_images_mini{
  width: 60px;
  height: 60px;
  margin: auto;
  float: left;
}


@media screen and (max-width:800px) {
  html, body {
    height: 100%;
   }
   .popup-content {
    min-height: 100%;
    height: 100%;
  }

  .home {
    position: absolute;
    min-height: 100%;
    background-size: cover;
  }
  .player_section{
    display: flex;
    top: auto;
    flex-direction: column;
    flex: 1 1 auto;
    max-height: 0;
  }
  .field {
    width: 400px;
    background-size: 100%;
    max-width: 100%;
  }
  .player_info{
    min-height: auto;
  }
  .playerformation{
    margin: auto;
    height: 20px;
    width: 20px;
  }
}

@media screen and (max-width:380px){
  .field{
    padding-bottom: 10%;
  }
  .player_images_mini{
    width: 50px;
    height: 50px;
  }
}

@media screen and (max-width:360px){
  .field{
    padding-bottom: 16%;
  }
  .player_images_mini{
    width: 50px;
    height: 50px;
  }
}

@media screen and (max-width:320px){
  .field{
    padding-bottom: 36%;
  }
  .player_images_mini{
    width: 50px;
    height: 50px;
  }
}

</style>

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
          <div class="pdata">
            <div><fa-icon class="heart" v-if="$store.getters.isInFav(player)" icon="heart" :style="{ color: '#B94040', top: '50%' }" @click="favremove(player)"></fa-icon><fa-icon class="heart" v-else icon="heart" :style="{ color: '#9E9C9C', top: '50%' }" @click="addtofav(player)"></fa-icon></div>
            <div class="player_name">{{player.name}} {{player.lastName}}</div>
            <div>{{player.stats.position}}</div></div>
          <img class="player_image" v-bind:src="player.playerPicture">
          <div class="add_favs">
            <img class="team_img" v-bind:src="player.teamCrest">
            <label>{{player.stats.club.toUpperCase()}}</label>
          </div>
        </div>
      </div>
    </div>
  </div>
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
      player_order: "",
      clickedplayer : "",
      playerparentid : "",
      playerobject: "",
      onterrain: []
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
      let playerchange;
      const modal = document.getElementById("myModal");
      const player = e.target.parentElement.id;
      if(e.target.className === "playerimg"){
        playerchange = e.target.parentElement.parentElement;
      } else if (e.target.className === "underplayerextended"){
        playerchange = e.target.parentElement;
      } else if (e.target.className === "modelstlye"){
        playerchange = e.target.parentElement;
      } else if (e.target.className === "underplayer"){
        playerchange = e.target.parentElement;
      }
      if(playerchange){
        if(this.players.length >= 1 ){
          this.players = [];
        }
        this.player_order = playerchange.style.order;
        const playerparentid = playerchange.parentElement.id;
        for(let i = 0; i < this.$store.state.store.players.length; i++){
          if(this.$store.state.store.players[i].name.includes(playerchange.children[1].innerHTML) || this.$store.state.store.players[i].lastName.includes(playerchange.children[1].innerHTML)){
            this.clickedplayer = playerchange;
            this.playerobject = this.$store.state.store.players[i];
          }
       }
       for(let i = 0; i < this.$store.state.store.players.length; i++){
        for(let j = 0; j < this.$store.state.store.players[i].stats.posiblePositions.length; j++){
          if(this.$store.state.store.players[i].stats.posiblePositions[j] === playerparentid){
            this.players.push(this.$store.state.store.players[i]);
          }
        }
      }
        modal.style.display = "block";
      } else {
        this.player_order = e.target.style.order;
        this.playerparentid = e.target.parentElement.id;
      }
      if(e.target.className === "playerformation"){
        if(this.players.length >= 1 ){
          this.players = [];
        }
      if(this.element.length >= 1 ){
        this.element = []
      }
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
      console.log(player)
      const modal = document.getElementById("myModal");
      const pos = document.getElementById(this.playerparentid);
      const model = document.createElement("div");
      const player_background = document.createElement("div");
      const underplayer = document.createElement("div");
      const player_pic = document.createElement("img");
      this.change = player;
      this.$store.commit("favoritesadd", player);
      this.onterrain.push(player);
      player_pic.src = this.change.formationPicture;
      model.style.order = this.player_order;
      player_background.className = "playerbackground";
      model.className = "modelstlye";
      if(this.clickedplayer ){
        const parent = this.clickedplayer.parentElement;
        this.clickedplayer.remove();
        if(this.change.lastName === ""){
          underplayer.innerHTML = this.change.name;
        } else {
          underplayer.innerHTML = this.change.lastName;
        }
        if(underplayer.innerHTML.length > 7){
          underplayer.className = "underplayerextended"
        } else {
          underplayer.className = "underplayer";
        }
        player_pic.className = "playerimg";
        player_background.appendChild(player_pic);
        model.appendChild(player_background);
        model.appendChild(underplayer);
        parent.appendChild(model);
        this.clickedplayer = false;
      } else {
        if(this.change.lastName === ""){
          underplayer.innerHTML = this.change.name;
        } else {
          underplayer.innerHTML = this.change.lastName;
        }
        if(underplayer.innerHTML.length > 7){
          underplayer.className = "underplayerextended"
        } else {
          underplayer.className = "underplayer";
        }
        player_pic.className = "playerimg";
        player_background.appendChild(player_pic);
        model.appendChild(player_background);
        model.appendChild(underplayer);
        pos.appendChild(model);
      }
      if(player !== this.playerobject){
        this.$store.commit("favoritesremove", this.playerobject);
      }
      if(this.$store.state.favs.includes(player)){
        modal.style.display = "none";
      }
    },
    favremove(player){
      this.$store.commit("favoritesremove", player);
    },
    removefromfav(player){
      this.$store.commit("favoritesremove", player);
    },
    sort_pop(){
      document.getElementById("pop").style.color = "#858585";
      document.getElementById("val").style.color = "#242424";
      document.getElementById("age").style.color = "#242424";
      return this.players.sort((a,b) => b.result - a.result);
    },
    sort_value(){
      document.getElementById("pop").style.color = "#242424";
      document.getElementById("val").style.color = "#858585";
      document.getElementById("age").style.color = "#242424";
      return this.players.sort((a,b) => Number(b.stats.value.replace(/\D/g,'')) - Number(a.stats.value.replace(/\D/g,'')));
    },
    sort_age(){
      document.getElementById("pop").style.color = "#242424";
      document.getElementById("val").style.color = "#242424";
      document.getElementById("age").style.color = "#858585";
      const date = new Date();
      const year = date.getFullYear();
      return this.players.sort((a,b) => (new Date(b.stats.birthDate).getFullYear() - year) - (new Date(a.stats.birthDate).getFullYear() - year));
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
  background-color: #DFDFDF;
  width: 100%;
}

.pdata{
  display: flex;
  justify-content: space-between;
  background-color: #DFDFDF;
  align-items: center;
  padding: 6% 5% 6% 5%;
}

.popup-content {
  position: absolute;
  overflow: auto;
  background: url("../assets/background.jpg") no-repeat center center fixed;
  background-size: cover;
  margin-top: 5.5vh;
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
  background-color: #CBCBCB;
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

.playerimg{
  display:block;
  width: 60px;
  height: 60px;
  margin: auto;
  border-radius: 50%;
}

.playerbackground{
  background-color: white;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  display: inline-block;
  margin: auto;
}

.underplayer{
  background-color: white;
  text-align: center;
  display: inline;
  margin: auto;
  width: 60px;
}

.underplayerextended{
  background-color: white;
  text-align: center;
  display: inline;
  margin: auto;
  width: auto;
}

.modelstlye{
  display: flex;
  flex-direction: column;
  margin: auto;
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
  margin: auto;
  height: 25px;
  width: 25px;
  background-color: #2D3B0D;
  border-radius: 50%;
  box-shadow: 0px 2px 4.9px 0.1px rgba(0, 0, 0, 0.4);
  border: solid 1px rgba(255, 255, 255, 0.5);
}

.player_section{
  position: absolute;
  top: 25%;
  max-height: 50%;
  display: flex;
  align-self: center;
}

.player_info{
  display: flex;
  flex-direction: column;
  position: relative;
  padding: 2%;
  margin: 0 auto;
  min-height: 100%;
  width: 100%;
  justify-content: space-between;
  flex: 0.4 0.4;
}

.player_name{
  margin: auto;
  align-content: center;
}

.player_image{
  width: 100%;
  height: 100%;
}

.add_favs{
  background-color: #DFDFDF;
  display: flex;
  padding: 2%;
  align-items: center;
  height: 45px;
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
    margin-top: 6.5vh;
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
  .popup-content {
    min-height: 100%;
    height: 100%;
    margin-top: 7vh;
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
  .popup-content {
    min-height: 100%;
    height: 100%;
    margin-top: 8vh;
  }
}

</style>

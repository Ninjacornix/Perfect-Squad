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
    <div id="myModal" class="modal">
    <div class="modal-content">
      <span class="close">&times;</span>
    </div>
  </div>
  </div>
</template>

<script>

export default {
  data: function(){
    return {
      positions: ["CF","LW","AM","RW","LM","CM","RM","DM","LB","CB","RB","GK"],
      players: []
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
      this.players = [];
      const modal = document.getElementById("myModal");
      const span = document.getElementsByClassName("close")[0];
      const player = e.target.parentElement.id;
      for(let i = 0; i < this.$store.state.store.players.length; i++){
        for(let j = 0; j < this.$store.state.store.players[i].stats.posiblePositions.length; j++){
          if(this.$store.state.store.players[i].stats.posiblePositions[j] === player){
            console.log(this.$store.state.store.players[i]);
          this.players.push(this.$store.state.store.players[i]);
          }
        }
      }
      modal.style.display = "block";
      span.onclick = function() {
          modal.style.display = "none";
        }
        window.onclick = function(event) {
          if (event.target == modal) {
            modal.style.display = "none";
          }
        }
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
  border-radius: 2%;
  width: 80%;
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

// AREAS
#CF{
  margin: 20% auto 0 auto;
  width: 35%;
  height: 13%;
  display: flex;
}

.upper{
  margin: 0 auto 0 auto;
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
  margin: 0 auto 0 auto;
  width: 82%;
  height: 17%;
  display: flex;
}

#LM{
  width: 25%;
  height: 100%;
}

#CM{
  width: 50%;
  height: 100%;
  display: flex;
}

#RM{
  width: 25%;
  height: 100%;
}

#DM{
  margin: 0 auto 0 auto;
  width: 40%;
  height: 13%;
}

.back{
  margin: 0 auto 0 auto;
  width: 82%;
  height: 15%;
  display: flex;
}

#LB{
  width: 25%;
  height: 100%;
}

#CB{
  width: 50%;
  height: 100%;
  display: flex;
}

#RB{
  width: 25%;
  height: 100%;
}

#GK{
  width: 25%;
  height: 10%;
  margin: 0 auto 0 auto;
  display: flex;
}

.playerformation{
  margin: auto;
  height: 25px;
  width: 25px;
  background-color: orange;
  border-radius: 50%;
}


@media screen and (max-width:800px) {
  html, body { height: 100%; }
  .home {
    position: absolute;
    min-height: 100%;
    background-size: cover;
  }
  .field {
    width: 400px;
    height: 700px;
    background-size: 100%;
    max-width: 100%;
  }
  #CF{
    margin: 10% auto 0 auto;
  }
}

</style>

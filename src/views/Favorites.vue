<template>
  <div id="favorites_page">
    <div class="fav_playerspage">
      <div class="fav_player" v-for="(person, index) in this.$store.state.favs" :key="index">
        <img class="fav_player_image" v-bind:src="person.formationPicture">
        <div class="fav_player_name">{{person.name}} {{person.lastName}}</div>
        <img class="fav_player_team" v-bind:src="person.teamCrest">
      </div>
    </div>
  </div>
</template>

<style>
#favorites_page {
  padding-top: 10px;
  background: url("../assets/background.jpg") no-repeat center center fixed;
  background-size: cover;
  min-height: 100%;
}

.fav_playerspage{
  display: flex;
  flex-direction: column;
  margin: 5% auto;
  margin-bottom: 0;
}

.fav_player{
  border: 2px solid white;
  display: flex;
  background-color: lightgray;
  border-radius: 25px;
  margin: 0 5% 2% 5%;
  padding-left: 3%;
  padding-right: 3%;
}

.fav_player_name{
  margin: auto;
}

.fav_player_image{
  height: 100px;
}

.fav_player_team{
  margin: auto;
  margin-right: 0;
  margin-left: 0;
}

@media screen and (max-width:800px) {
  html, body {
    min-height: 100vh;
   }
  .fav_playerspage{
    margin: 15% auto;
    margin-bottom: 0;
  }
  .fav_player{
    padding-left: 5%;
    padding-right: 5%;
  }
}

</style>
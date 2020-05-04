<template>
  <div class="home">
    <div class="field">
      <span class="dot"></span>
    </div>
  </div>
</template>

<script>

export default {
  
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
  display:flex;
}

.dot {
  position: absolute;
  height: 15px;
  width: 15px;
  background-color: #bbb;
  border-radius: 50%;
  margin: auto;
  bottom: 40px;
  vertical-align: middle;
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
}

</style>

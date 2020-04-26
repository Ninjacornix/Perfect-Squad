<template>
  <div class="home">
    <div class="field"></div>
  </div>
</template>

<script>

export default {
  
}
</script>
<style lang="scss">

.home {
  position: relative;
  top: 0;
  padding-top: 10px;
  background: url("../assets/background.jpg") no-repeat center center fixed;
  background-size: cover;
  height: 100%;
  width: 100%;
}

.field {
  position: relative;
  width: 420px;
  height: 700px;
  margin: 0 auto;
  margin-top: 60px;
  background: url("../assets/field.jpg") no-repeat;
  background-size: 100%;
}

@media (max-width:800px) {
  .home {
    position: relative;
  }
  .field {
    width: 400px;
    height: 700px;
    background-size: 100%;
  }
}

</style>

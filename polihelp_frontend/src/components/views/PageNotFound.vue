<template>
  <div id="pageNotFound">
    <div class="container">
      <h1>Ooopsss... Se pare ca pagina accesata nu exista.</h1>
      <div class="img-container">
        <img src="@/assets/images/pageNotFound.png" alt="pageNotFound.png">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PageNotFound',
  data() {
    return {

    }
  }
}
</script>

<style>
h1 {
  color: #FFFFFF;
  font-size: 32px;
  margin-top: 70px;
  text-align: center;
}

.img-container {
  width: 750px;
  height: 375px;
  margin: 60px auto 0;
  position: relative;
}

.img-container img {
  width: 750px;
  height: 375px;
  position: absolute;
}
</style>
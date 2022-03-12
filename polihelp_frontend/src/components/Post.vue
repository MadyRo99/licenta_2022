<template>
  <div class="Post">
    <div>
      <div class="post-user">
        <div class="post-user-left">
          <div class="img-container-user">
            <img src="@/assets/images/default-user.png" alt="default-user.png">
          </div>
          <div class="post-user-info">
            <h1>Mihai Petre</h1>
            <h2>23 octombrie la 10:00</h2>
          </div>
          <div class="clearfix"></div>
        </div>
        <div class="post-social-info">
          <div class="post-likes">
            <h2>2,3 K</h2>
            <div class="img-container-like">
              <img src="@/assets/images/like.png" alt="like.png">
            </div>
          </div>
          <div class="post-comments">
            <h2>2,3 K</h2>
            <div class="img-container-like">
              <img src="@/assets/images/comment.png" alt="comment.png">
            </div>
          </div>
          <div class="clearfix"></div>
        </div>
        <div class="clearfix"></div>
        <div class="post-faculty">
          <h3>
            Student la Facultatea de Electronica, Telecomunicatii si Tehnologia Informatiei
            <br>
            Anul II - Licenta
          </h3>
        </div>
        <p>
          Postat in <b>Grupul Facultatii ETTI</b>
        </p>
        <hr color="#FFFFFF">
        <p>
          Spitalele sunt arhipline, medicii, personalul medical lucreaza non stop, locuri la terapie intensiva nu mai sunt disponibile. Vorbim despre o catastrofa, o situatie disperata în care am primit deja sprijin de la opt state europene. Avem ajutor din toate paraile, dar nimeni nu poate sa se vaccineze în locul nostru, asta trebuie sa o facem noi! Nu exista alta solutie decât vaccinarea si trebuie sa fim seriosi si sa acceptam acest lucru. Dragi români, mergeti si va vaccinati, sa nu ajungeti la spital, si sa nu dati boala mai departe, sa terminam odata cu aceasta pandemie. În toate statele din vestul Europei, pandemia a fost domolita prin vaccinare.
        </p>
        <button type="button" class="btn btn-danger">Sterge Postarea</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Post',
  data() {
    return {
      data: ""
    }
  },
  computed: {
  },
  methods: {
  }
}
</script>

<style scoped>
.post-user {
  max-width: 1000px;
  margin: 0px auto 35px;
  padding: 25px 25px 10px;
  background: #44449B;
  border-radius: 8px;
  color: #F4F7F8;
}

.img-container-user {
  position: relative;
  float: left;
  margin-right: 10px;
  width: 75px;
  height: 75px;
}

.post-user .img-container-user img {
  position: absolute;
  border-radius: 50px;
  width: 75px;
  height: 75px;
}

.img-container-like {
  position: relative;
  float: left;
  margin-right: 20px;
  width: 40px;
  height: 35px;
}

.post-user .img-container-like img {
  position: absolute;
  width: 40px;
  height: 35px;
}

.post-user .post-user-info {
  margin-top: 14px;
  margin-left: 5px;
  float: left;
}

.post-user-left {
  float: left;
}

.post-social-info {
  float: right;
  margin-top: 7.5px;
}

.post-likes {
  float: left;
}

.post-comments {
  float: left;
}

.post-social-info h2 {
  font-size: 12px;
  margin-left: 7.5px;
  font-weight: bold;
}

.post-user .post-user-info h1 {
  font-size: 18px;
}

.post-user .post-user-info h2 {
  font-size: 14px;
}

.post-faculty h3 {
  font-size: 16px;
  padding-top: 20px;
}

.post-user p {
  font-size: 16px;
}

@media screen and (min-width: 480px) {
  .post-user {
    max-width: 700px;
  }
}
</style>

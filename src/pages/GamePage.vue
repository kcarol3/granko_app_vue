<template>
  <div class="game-page">
    <div class="back-button" @click="goBack()"><font-awesome-icon icon="arrow-left"/> Go back</div>
    <h1 class="title">{{ game.title }}</h1>
    <div class="pictures">
      <img :src="currentImage" alt="mainPicture" class="main-image"/>
      <div class="image-grid">
        <div v-for="(image, index) in game.alternativeSrc" :key="index" class="image-item">
          <img :src="image.src" :alt="image.alt || `Image ${index + 1}`" class="image"
               @click="changeMainPicture(image.src)"/>
        </div>
      </div>
    </div>
    <div class="buttons">
      <span><font-awesome-icon icon="money-bill" class="icon"/>{{ game.price }}</span>
      <span>
        <button class="button"><font-awesome-icon icon="cart-arrow-down" style="margin-right: 10px"/>Buy</button>
        <button class="share-button"><font-awesome-icon icon="share-from-square" style="margin-right: 10px"/>Share</button>
      </span>
    </div>
    <div class="description">
      <p v-html="description"></p>
    </div>
  </div>
</template>

<script>
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";

export default {
  components: {FontAwesomeIcon},
  props: {
    data: {
      type: String,
      required: true,
      default: '',
    },
  },
  data() {
    return {
      game: JSON.parse(this.data),
      currentImage: JSON.parse(this.data).src,
      description: 'Dive into a thrilling adventure filled with action, challenges, and endless possibilities! ' +
          ' This game combines stunning visuals, immersive gameplay, and captivating storytelling to keep you hooked.</br>' +
           '</br>' +
           '🌍 Exploration: Discover a rich, detailed world.</br>' +
           '⚔️ Action & Strategy: Battle, plan, and conquer.</br>' +
           '🎮 Multiplayer: Team up or compete with players worldwide.',
    }
  },
  methods: {
    changeMainPicture(src) {
      this.currentImage = src
    },
    goBack(){
      this.$router.back();
    }
  }
};
</script>

<style scoped>
.title {
  color: #62ff00;
  font-size: 2.2rem;
  width: 80%;
  margin: 0 auto 1rem;
}

.image-grid {
  max-width: 55rem;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: auto;
}

.image-item {
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  scale: 0.9;
  transition: transform 0.3s ease;
}

.image-item:hover {
  transform: scale(1.1);
}

.image {
  display: block;
  width: 15rem;
  height: 10rem;
  mask-repeat: no-repeat;
  mask-position: center;
  mask-size: cover;
}

.game-page {
  padding: 0 2rem 0;
  margin: 0 auto;
}

.main-image {
  display: block;
  width: 30rem;
  height: 20rem;
  margin: 5px auto 5px;
  border-radius: 24px;
}

.pictures {
  display: flex;
  justify-content: center;
  width: 80%;
  margin: auto;
}

.buttons {
  display: flex;
  justify-content: space-between;
  width: 80%;
  margin: 2rem auto 1rem;
}

.icon {
  font-size: 2rem;
  color: #62ff00;
  margin-right: 0.5rem;
}

span {
  color: white;
  font-size: 2rem;
}

.button {
  background-color: #62ff00;
  color: #004547;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 15px;
  font-size: 1.5rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.share-button {
  color: #62ff00;
  background-color: #004547;
  border-style: solid;
  border-color: #62ff00;
  padding: 0.4rem 1rem;
  border-radius: 15px;
  font-size: 1.5rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-left: 1rem;
}

.description {
   color: white;
  max-width: 80%;
  margin:  0 auto 0;
  padding: 2rem 2rem 1rem 2rem;
  background-color: #004547;
  border-radius: 1.5rem;
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.9);
}

.button:hover,
.share-button:hover {
  background-color: #47cc00;
}

.back-button {
  color: rgba(255, 255, 255, 0.81);
  font-size: 1rem;
  margin-bottom: 1rem;
}
.back-button:hover {
  cursor: pointer;
}
</style>



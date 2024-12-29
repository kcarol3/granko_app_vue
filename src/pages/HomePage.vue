<template>
  <div>
    <h1>Home</h1>
    <div class="home-page">
      <h2 class="free-games">
        <font-awesome-icon icon="gift" style="margin-right: 10px"/>
        <span>Free Games</span>
      </h2>
      <div class="image-grid">
        <div v-for="(image, index) in images.slice(0,3)" :key="index" class="image-item" @click="goToGamePage(index)">
          <img :src="image.src" :alt="image.alt || `Image ${index + 1}`" class="image"/>
          <div>
            <h3>{{ image.title }}</h3>
            <h4>{{ image.subtitle }}</h4>
          </div>
        </div>
      </div>
    </div>
    <div class="carousel">
      <h2 class="free-games" style="text-align: left;">
        <font-awesome-icon icon="fire-flame-curved" style="margin-right: 10px"/>
        <span>Trending games</span>
      </h2>
      <Carousel
          :items-to-show="3.5"
          :wrap-around="true"
          :autoplay=1
          :transition="3000"
      >
        <Slide v-for="slide in images" :key="slide">
          <img :src="slide.src" :alt="slide.alt" style="width: 270px; height: 180px"/>
        </Slide>

        <template #addons>
          <Navigation/>
        </template>
      </Carousel>
    </div>
  </div>
</template>

<script setup>
import 'vue3-carousel/dist/carousel.css'
import {Carousel, Slide, Navigation} from 'vue3-carousel'

</script>

<script>
import placeholder from "../assets/placeholder.jpg"
import game1 from "../assets/games/gra1.jpg"
import game2 from "../assets/games/gra2.jpg"
import game3 from "../assets/games/gra3.jpg"
import game4 from "../assets/games/gra5.jpg"


export default {
  name: "HomePage",

  data() {
    return {
      slides: 7,
      images: [
        {src: game1, price: "Free", alternativeSrc: [ {src: game1}, {src: placeholder}, {src: placeholder}, {src: placeholder} ], alt: "Placeholder 1", title: "The Knights - new era", subtitle: "Free Now - 24 December 2024"},
        {src: game2, price: "Free",alternativeSrc: [ {src: game2}, {src: placeholder}, {src: placeholder}, {src: placeholder} ], alt: "Placeholder 2", title: "D&D - 2024 edition", subtitle: "Free Now - 24 December 2024"},
        {src: game3, price: "Free", alternativeSrc: [ {src: game3}, {src: placeholder}, {src: placeholder}, {src: placeholder} ], alt: "Placeholder 3", title: "Fun in the Sun", subtitle: "Is coming"},
        {src: game4, price: "Free", alternativeSrc: [ {src: game4}, {src: placeholder}, {src: placeholder}, {src: placeholder} ], alt: "Placeholder 4", title: "Fun in the Sun", subtitle: "Is coming"},
      ],
      visibleCount: 3,
      currentIndex: 0,
    }
  },
  methods: {
    goToGamePage(index) {
      this.$router.push({path: "/game", query: {data: JSON.stringify(this.images[index])}});
    },
  },
};

</script>

<style scoped>
.image-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.image-item {
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  scale: 1;
  transition: transform 0.3s ease;
}

.image-item:hover {
  transform: scale(1.1);
}

.image {
  display: block;
  width: 18rem;
  scale: 0.9;
  height: 12rem;
  mask-repeat: no-repeat;
  mask-position: center;
  mask-size: cover;
}

.free-games {
  color: #62ff00;
  font-size: 2.2rem;
}

.home-page {
  padding: 2rem 2rem 1rem 2rem;
  width: 80%;
  height: fit-content;
  background-color: #004547;
  border-radius: 1.5rem;
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.9);
  margin: auto auto 1rem;
}

h3 {
  color: white;
  padding-left: 1rem;
  padding-top: 1rem;
  font-size: 1.4rem;
}

h4 {
  color: rgba(255, 255, 255, 0.8);
  padding-left: 1rem;
  font-size: 1.1rem;
}

.carousel-3d-container figure {
  margin: 0;
}


.carousel__slide {
  padding: 5px;
}

.carousel__viewport {
  perspective: 2000px;
}

.carousel__track {
  transform-style: preserve-3d;
}

.carousel__slide--sliding {
  transition: 0.5s;
}

.carousel__slide {
  opacity: 0.9;
  transform: rotateY(-20deg) scale(0.9);
}

.carousel__slide--active ~ .carousel__slide {
  transform: rotateY(20deg) scale(0.9);
}

.carousel__slide--prev {
  opacity: 1;
  transform: rotateY(-10deg) scale(0.95);
}

.carousel__slide.carousel__slide--next {
  opacity: 1;
  transform: rotateY(10deg) scale(0.95);
}

.carousel__slide--active {
  opacity: 1;
  transform: rotateY(0) scale(1);
}

.carousel {
  width: 65rem;
  margin: 0 auto;
}

h1 {
  color: #62ff00;
  font-size: 2.5rem;
}
</style>
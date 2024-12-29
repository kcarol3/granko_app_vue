<template>
  <div>
    <div class="back-button" @click="goBack()"><font-awesome-icon icon="arrow-left"/> Go back to home</div>
    <h1>Store</h1>
    <div style="display: flex; justify-content: space-between;">
      <div class="store-page">
        <div class="image-grid">
          <div v-for="(image, index) in filteredImages"
               :key="index" class="image-item" @click="goToGamePage(index)">
            <img :src="image.src" :alt="image.alt || `Image ${index + 1}`" class="image"/>
            <div>
              <h2>{{ image.title }}</h2>
              <h3>{{ image.subtitle }}</h3>
              <h3>{{ image.price }}</h3>
            </div>
          </div>
        </div>
      </div>
      <div class="filter-bar">
        <h3>Filter by</h3>
        <div class="filter-element">
          <label for="category">Type:</label>
          <select id="category" v-model="selectedCategory" @change="filterGames">
            <option value="all">All</option>
            <option v-for="category in categories" :key="category" :value="category">
              {{ category }}
            </option>
          </select>
        </div>
        <div class="filter-element">
          <label for="priceFilter">Price Range:</label>
          <select id="priceFilter" v-model="selectedPriceRange" @change="filterGames">
            <option value="all">All</option>
            <option value="free">Free</option>
            <option value="low">Below $20</option>
            <option value="mid">$20 - $50</option>
            <option value="high">Above $50</option>
          </select>
        </div>
        <div class="filter-element">
          <label for="sort">Sort by:</label>
          <select id="sort" v-model="selectedSortOption" @change="sortGames">
            <option value="default">Default</option>
            <option value="priceAsc">Price: Low to High</option>
            <option value="priceDesc">Price: High to Low</option>
            <option value="titleAsc">Title: A to Z</option>
            <option value="titleDesc">Title: Z to A</option>
          </select>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import game1 from "../assets/games/gra1.jpg"

import game51 from "../assets/games/gra11.jpg"
import game52 from "../assets/games/gra12.jpg"
import game53 from "../assets/games/gra13.jpg"

import game61 from "../assets/games/gra21.jpg"
import game62 from "../assets/games/gra22.jpg"
import game63 from "../assets/games/gra23.jpg"

import game71 from "../assets/games/gra31.jpg"
import game72 from "../assets/games/gra32.jpg"
import game73 from "../assets/games/gra33.jpg"


import game81 from "../assets/games/gra51.jpg"
import game82 from "../assets/games/gra52.jpg"
import game83 from "../assets/games/gra53.jpg"
import placeholder from "@/assets/placeholder.jpg";
import game4 from "@/assets/games/gra5.jpg";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";

export default {
  name: "HomePage",
  components: {FontAwesomeIcon},

  data() {
    return {
      images: [
        {
          src: game1,
          price: "Free",
          type: "RPG",
          alternativeSrc: [{src: game1}, {src: placeholder}, {src: placeholder}, {src: placeholder}],
          alt: "Placeholder 1",
          title: "The Knights - new era",
          subtitle: "Now - 24 December 2024"
        },
        {
          src: game4,
          type: "Adventure",
          price: "59.99 USD",
          alternativeSrc: [{src: game4}, {src: placeholder}, {src: placeholder}, {src: placeholder}],
          alt: "Placeholder 2",
          title: "Fun in the Sun",
          subtitle: "Is coming"
        },
        {
          src: game51,
          price: "19.99 USD",
          type: "Sci-Fi",
          alternativeSrc: [{src: game51}, {src: game51}, {src: game52}, {src: game53}],
          alt: "Placeholder 3",
          title: "Cyberverse",
          subtitle: "Available now"
        },
        {
          src: game61,
          price: "39.99 USD",
          type: "Adventure",
          alternativeSrc: [{src: game61}, {src: game61}, {src: game62}, {src: game63}],
          alt: "Placeholder 4",
          title: "Dreamscape",
          subtitle: "Available now"
        },
        {
          src: game71,
          price: "39.99 USD",
          type: "Adventure",
          alternativeSrc: [{src: game71}, {src: game71}, {src: game72}, {src: game73}],
          alt: "Placeholder 5",
          title: "Mystic quest",
          subtitle: "Available now"
        },
        {
          src: game81,
          price: "69.99 USD",
          type: "RPG",
          alternativeSrc: [{src: game81}, {src: game81}, {src: game82}, {src: game83}],
          alt: "Placeholder 6",
          title: "Reams of legends",
          subtitle: "Is coming"
        },
      ],
      categories: ["RPG", "Adventure", "Sci-Fi"],
      selectedCategory: "all",
      selectedSortOption: "default",
      filteredImages: [],
      selectedPriceRange: "all",
    }
  },
  created() {
    this.filteredImages = this.images;
  },
  methods: {
    sortGames() {
      if (this.selectedSortOption === "priceAsc") {
        this.filteredImages.sort((a, b) => {
          const priceA = a.price === "Free" ? 0 : parseFloat(a.price.replace(" USD", ""));
          const priceB = b.price === "Free" ? 0 : parseFloat(b.price.replace(" USD", ""));
          return priceA - priceB;
        });
      } else if (this.selectedSortOption === "priceDesc") {
        this.filteredImages.sort((a, b) => {
          const priceA = a.price === "Free" ? 0 : parseFloat(a.price.replace(" USD", ""));
          const priceB = b.price === "Free" ? 0 : parseFloat(b.price.replace(" USD", ""));
          return priceB - priceA;
        });
      } else if (this.selectedSortOption === "titleAsc") {
        this.filteredImages.sort((a, b) => a.title.localeCompare(b.title));
      } else if (this.selectedSortOption === "titleDesc") {
        this.filteredImages.sort((a, b) => b.title.localeCompare(a.title));
      }
    },
    goBack() {
      this.$router.push("/home");
    },
    goToGamePage(index) {
      this.$router.push({path: "/game", query: {data: JSON.stringify(this.images[index])}});
    },
    filterGames() {
      let filtered = this.images;

      if (this.selectedCategory !== "all") {
        filtered = filtered.filter(image => image.type === this.selectedCategory);
      }

      if (this.selectedPriceRange !== "all") {
        filtered = filtered.filter(image => {
          const price = image.price === "Free" ? 0 : parseFloat(image.price.replace(" USD", ""));
          if (this.selectedPriceRange === "free") return price === 0;
          if (this.selectedPriceRange === "low") return price > 0 && price < 20;
          if (this.selectedPriceRange === "mid") return price >= 20 && price <= 50;
          if (this.selectedPriceRange === "high") return price > 50;
        });
      }

      this.filteredImages = filtered;
    },
  },
};

</script>

<style scoped>
.back-button {
  color: rgba(255, 255, 255, 0.81);
  font-size: 1rem;
}
h1 {
  color: #62ff00;
  margin-top: 1rem;
  font-size: 2.5rem;
}
.back-button:hover {
 cursor: pointer;
}
.store-page {
  width: 100%;
}

.filter-bar {
  padding: 2rem !important;
  background-color: #004547;
  border-radius: 1.5rem;
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.9);
  height: fit-content;
  display: block;
  align-items: center;
}

.filter-bar h3 {
  margin-bottom: 2rem;
  color: white;
  font-size: 1.5rem;
  text-align: center;
}

.filter-bar label {
  color: white;
  margin-right: 0.5rem;
}

.filter-bar select {
  width: 100%;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.filter-element {
  margin-bottom: 1rem;
}
.image-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);

  gap: 5px;
  scale: 0.9;
  padding: 0 2rem;
}

.image-item {
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  padding: 0.5rem;
  margin: auto;
}

.image-item:hover {
  transform: scale(1.1);
  background-color: #0b2201;
}

.image {
  display: block;
  width: 15rem;
  height: 10rem;
  mask-repeat: no-repeat;
  mask-position: center;
  mask-size: cover;
}

h2 {
  color: white;
  padding-left: 1rem;
  padding-top: 1rem;
  font-size: 1.4rem;
}

h3 {
  color: rgba(255, 255, 255, 0.8);
  padding-left: 1rem;
  font-size: 1rem;
}
</style>
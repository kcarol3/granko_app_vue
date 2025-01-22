<template>
    <div>
        <h1>Home</h1>
        <div class="home-page">
            <h2 class="free-games">
                <font-awesome-icon icon="gift" style="margin-right: 10px"/>
                <span>Free Games</span>
            </h2>
            <div class="image-grid">
                <div v-for="(game, index) in games.slice(0,3)" :key="index" class="image-item"
                     @click="goToGamePage(game.id)">
                    <img :src="this.urls.get(game.alt)" :alt="game.alt" style="width: 257px; height: 200px;" />
                    <div>
                        <h3>{{ game.title }}</h3>
                        <h4>{{ game.subTitle }}</h4>
                        <h3>Free now</h3>/
                    </div>
                </div>
            </div>
        </div>
        <!--    <div class="carousel">-->
        <!--      <h2 class="free-games" style="text-align: left;">-->
        <!--        <font-awesome-icon icon="fire-flame-curved" style="margin-right: 10px"/>-->
        <!--        <span>Trending games</span>-->
        <!--      </h2>-->
        <!--      <Carousel-->
        <!--          :items-to-show="3.5"-->
        <!--          :wrap-around="true"-->
        <!--          :autoplay=1-->
        <!--          :transition="3000"-->
        <!--      >-->
        <!--        <Slide v-for="slide in images" :key="slide">-->
        <!--          <img :src="slide.src" :alt="slide.alt" style="width: 270px; height: 180px"/>-->
        <!--        </Slide>-->

        <!--        <template #addons>-->
        <!--          <Navigation/>-->
        <!--        </template>-->
        <!--      </Carousel>-->
        <!--    </div>-->
    </div>
</template>

<script setup>
import 'vue3-carousel/dist/carousel.css'
// import {Carousel, Slide, Navigation} from 'vue3-carousel'

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
            // slides: 7,
            images: [
                {
                    src: game1,
                    price: "Free",
                    alternativeSrc: [{src: game1}, {src: placeholder}, {src: placeholder}, {src: placeholder}],
                    alt: "Placeholder 1",
                    title: "The Knights - new era",
                    subtitle: "Free Now - 24 December 2024"
                },
                {
                    src: game2,
                    price: "Free",
                    alternativeSrc: [{src: game2}, {src: placeholder}, {src: placeholder}, {src: placeholder}],
                    alt: "Placeholder 2",
                    title: "D&D - 2024 edition",
                    subtitle: "Free Now - 24 December 2024"
                },
                {
                    src: game3,
                    price: "Free",
                    alternativeSrc: [{src: game3}, {src: placeholder}, {src: placeholder}, {src: placeholder}],
                    alt: "Placeholder 3",
                    title: "Fun in the Sun",
                    subtitle: "Is coming"
                },
                {
                    src: game4,
                    price: "Free",
                    alternativeSrc: [{src: game4}, {src: placeholder}, {src: placeholder}, {src: placeholder}],
                    alt: "Placeholder 4",
                    title: "Fun in the Sun",
                    subtitle: "Is coming"
                },
            ],
            urls:new Map(),
            games: [],
            visibleCount: 3,
            currentIndex: 0,
        }
    },
    mounted() {
        this.getGames();
    },

    methods: {
        async fetchImage(fileName) {
            try {
                const token = localStorage.getItem("authToken");
                const response = await this.$axios.get(`http://localhost:8080/images/download/${fileName}`, {
                    responseType: "blob",
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                const blob = new Blob([response.data], { type: "image/jpeg" });
                this.urls.set(fileName, URL.createObjectURL(blob));
            } catch (error) {
                console.error("Error fetching image:", error);
            }
        },
        goToGamePage(index) {
            this.$router.push({path: `/game/${index}`});
        },
        getGames() {
            const token = localStorage.getItem("authToken");
            if (token) {
                this.$axios.get("http://127.0.0.1:8080/games/free", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }).then((response) => {
                    this.games = response.data;
                    this.games.forEach(game => {
                        this.fetchImage(game.alt)
                    })
                    console.log(this.games);
                })
            }
        }
    },
};

</script>

<style scoped>
.image-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); /* Automatyczna liczba kolumn */
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
    width: 100%;
    height: auto;
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

h1 {
    color: #62ff00;
    font-size: 2.5rem;
}

/* Media Queries */
@media screen and (max-width: 1024px) {
    .image-grid {
        grid-template-columns: repeat(2, 1fr); /* Dwie kolumny */
    }
}

@media screen and (max-width: 768px) {
    .image-grid {
        grid-template-columns: repeat(1, 1fr); /* Jedna kolumna */
    }
}

</style>

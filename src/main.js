import {createApp} from 'vue'
import App from './App.vue'
import {library} from "@fortawesome/fontawesome-svg-core";
import {
    faArrowLeft,
    faHome,
    faGamepad,
    faUser,
    faShop,
    faBars,
    faSearch,
    faDownload,
    faFireFlameCurved,
    faGift,
    faMoneyBill,
    faCartArrowDown,
    faShareFromSquare
} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import {createRouter, createWebHistory} from "vue-router";
import HomePage from "@/pages/HomePage.vue";
import AuthPage from "@/pages/AuthPage.vue";
import GamePage from "@/pages/GamePage.vue";
import Carousel3d from 'vue-carousel-3d';
import StorePage from "@/pages/StorePage.vue";
import UserPage from "@/pages/UserPage.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {path: '/', component: HomePage},
        {path: '/home', component: HomePage},
        {path: '/store', component: StorePage},
        {path: '/login', component: AuthPage},
        {path: '/profile', component: UserPage},
        {path: '/game', component: GamePage, props: (route) => ({data: route.query.data}),},
    ]
});

library
    .add(
        faArrowLeft,
        faHome,
        faGamepad,
        faUser,
        faShop,
        faBars,
        faSearch,
        faDownload,
        faFireFlameCurved,
        faGift,
        faMoneyBill,
        faCartArrowDown,
        faShareFromSquare
    );

createApp(App)
    .use(router)
    .use(Carousel3d)
    .component("font-awesome-icon", FontAwesomeIcon)
    .mount('#app')

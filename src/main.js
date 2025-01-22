import { createApp } from 'vue';
import App from './App.vue';
import { library } from "@fortawesome/fontawesome-svg-core";
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
    faShareFromSquare,
    faCartShopping
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { createRouter, createWebHistory } from "vue-router";
import HomePage from "@/pages/HomePage.vue";
import AuthPage from "@/pages/AuthPage.vue";
import GamePage from "@/pages/GamePage.vue";
import Carousel3d from 'vue-carousel-3d';
import StorePage from "@/pages/StorePage.vue";
import UserPage from "@/pages/UserPage.vue";
import moshaToast, {createToast} from 'mosha-vue-toastify';
import 'mosha-vue-toastify/dist/style.css';
import axiosInstance from "@/axiosInstance";
import AddGame from "@/pages/AddGame.vue";
import {jwtDecode} from "jwt-decode";
import UpdateGame from "@/pages/UpdateGame.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: HomePage, meta: { requiresAuth: true } },
        { path: '/add-game', component: AddGame, meta: { requiresAuth: true, roles: ['ROLE_ADMIN'] } },
        { path: '/edit-game/:id', component: UpdateGame, meta: { requiresAuth: true, roles: ['ROLE_ADMIN'] } },
        { path: '/home', component: HomePage, meta: { requiresAuth: true } },
        { path: '/store', component: StorePage, meta: { requiresAuth: true } },
        { path: '/login', component: AuthPage, meta: { requiresAuth: false } },
        { path: '/profile', component: UserPage, meta: { requiresAuth: true } },
        { path: '/game/:id', component: GamePage, meta: { requiresAuth: true } },
    ]
});

router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('authToken');

    if (to.meta.requiresAuth) {
        if (!token) {
            // Jeśli brak tokenu, przekieruj na stronę logowania
            return next({ path: '/login' });
        }

        try {
            const decoded = jwtDecode(token);
            const userRole = decoded.role;

            if (to.meta.roles && !to.meta.roles.includes(userRole)) {
                createToast('You can not view this page!',
                    {
                        showIcon: 'false',
                        type: 'warning',
                    })
                return next({ path: '/' });
            }
        } catch (error) {
            console.error('Error decoding token:', error);
            return next({ path: '/login' });
        }
    }
    next();
});

library.add(
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
    faShareFromSquare,
    faCartShopping
);

const app = createApp(App);

// Rejestracja axios jako właściwości globalnej
app.config.globalProperties.$axios = axiosInstance;

// Używanie dodatkowych bibliotek i komponentów
app.use(router);
app.use(moshaToast);
app.use(Carousel3d);
app.component("font-awesome-icon", FontAwesomeIcon);

// Montowanie aplikacji
app.mount('#app');

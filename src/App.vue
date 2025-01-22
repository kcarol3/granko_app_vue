<template>
    <div id="app">
        <div style="display: flex;">
            <LeftMenu
                :title="'Granko APP'"
                :menuItems="menuItems"
                @menuClick="handleMenuClick"
            />
            <div class="content">
                <TopBar
                    @login="onLogin"
                    @logout="onLogout"
                    @openCartModal="openCartModal"
                    @closeCartModal="closeCartModal"
                    @increase="increaseFontSize"
                    @decrease="decreaseFontSize"
                    @removeFromCart="removeFromCart"
                    @accept="accept"
                    :is-logged-in="this.isLoggedIn"
                    :cart="this.cart"
                    :is-cart-modal-open="this.isCartModalOpen"
                />
                <div style="padding: 30px 50px">
                    <router-view @checkLoginStatus="checkLoginStatus"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import LeftMenu from "@/components/Menu.vue";
import TopBar from "@/components/TopBar.vue";
import {jwtDecode} from "jwt-decode";

export default {
    name: 'App',
    components: {
        TopBar,
        LeftMenu

    },
    data() {
        return {
            isLoggedIn: false,
            isCartModalOpen: false,
            cart: [],
            menuItems: [
                {label: "Home", icon: "home", route: "/home"},
                {label: "Store", icon: "shop", route: "/store"},
                {label: "Profile", icon: "user", route: "/profile"},
                {label: "Add game", icon: "gamepad", route: "/add-game", role: "ROLE_ADMIN"},
            ],
            fontSize: 90,
        };
    },
    created() {
        this.checkLoginStatus();
    },
    methods: {
        accept() {
            if (localStorage.getItem("authToken")) {
                const token = localStorage.getItem("authToken");
                if (token) {
                    const decoded = jwtDecode(token);

                    this.$axios.post(`http://localhost:8080/user/accept-shopping-cart`, {
                        userId: decoded.userId,
                    },{
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }).then((response) => {
                        this.$moshaToast('Success',
                            {
                                showIcon: 'true',
                                type: 'success',
                            })
                        console.log(response.data);
                        this.checkLoginStatus();
                        this.closeCartModal();
                    }).catch((error) => {
                        console.error('Error fetching cart data:', error);
                    });
                }
            }
        },
        handleSearch(searchTerm) {
            console.log("Search term:", searchTerm);
        },
        handleLogin() {
            console.log("Login clicked");
        },
        handleDownload() {
            console.log("Download clicked");
        },
        removeFromCart(id) {
            const token = localStorage.getItem("authToken");
            if (token) {
                const decoded = jwtDecode(token);
                console.log(decoded);
                this.$axios.post(`http://localhost:8080/user/shopping-cart-remove`, {
                    userId: decoded.userId,
                    gameId: id
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }).then((response) => {
                    console.log(response)
                    this.$moshaToast('Success',
                        {
                            showIcon: 'true',
                            type: 'success',
                        })
                    this.checkLoginStatus();
                    this.closeCartModal();
                }).catch((error) => {
                    console.error('Error fetching cart data:', error);
                });
            }
        },

        increaseFontSize() {
            if (this.fontSize < 100) {
                this.fontSize += 10; // Zwiększ o 10%
                this.updateHtmlFontSize();
            }
        },
        decreaseFontSize() {
            if (this.fontSize > 80) { // Minimalna wartość 50%
                this.fontSize -= 10; // Zmniejsz o 10%
                this.updateHtmlFontSize();
            }
        },
        resetFontSize() {
            this.fontSize = 100; // Przywróć domyślną wartość
            this.updateHtmlFontSize();
        },
        updateHtmlFontSize() {
            document.documentElement.style.fontSize = this.fontSize + '%';
        },
        checkLogin() {
            if (localStorage.getItem("authToken")) {
                this.isLoggedIn = true
            }
        },
        checkLoginStatus() {
            if (localStorage.getItem("authToken")) {
                this.isLoggedIn = true
                const token = localStorage.getItem("authToken");
                if (token) {
                    const decoded = jwtDecode(token);
                    console.log(decoded);
                    this.$axios.get(`http://localhost:8080/user/shopping-cart/${decoded.userId}`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }).then((response) => {
                        this.cart = response.data;
                        console.log(response.data);
                    }).catch((error) => {
                        console.error('Error fetching cart data:', error);
                    });
                }
                this.checkLogin();
            }
        },
        onLogin() {
            this.$router.push('/login');
        },
        onLogout() {
            localStorage.removeItem("authToken");
            this.isLoggedIn = false;
            this.cart = []
            this.$router.push('/login');
        },
        openCartModal() {
            this.isCartModalOpen = true;
        },
        closeCartModal() {
            this.isCartModalOpen = false;
        },

    }
}
</script>

<style>
body {
    font-family: "Mina", sans-serif;
    background-image: linear-gradient(#004547, #0b2201);
}

.content {
    width: 100%;
}

.michroma-regular {
    font-family: "Mina", sans-serif;
    font-weight: 400;
    font-style: normal;
}

html {
    transition: font-size 0.3s ease-in-out;
}
</style>

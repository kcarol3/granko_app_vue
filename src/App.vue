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
            @search="handleSearch"
            @login="handleLogin"
            @download="handleDownload"
            @increase="increaseFontSize"
            @decrease="decreaseFontSize"
        />
        <div style="padding: 30px 50px">
          <router-view/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import LeftMenu from "@/components/Menu.vue";
import TopBar from "@/components/TopBar.vue";

export default {
  name: 'App',
  components: {
    TopBar,
    LeftMenu

  },
  data() {
    return {
      menuItems: [
        {label: "Home", icon: "home", route: "/home"},
        {label: "Store", icon: "shop", route: "/store"},
        {label: "Profile", icon: "user", route: "/profile"},
      ],
      fontSize: 90,
    };
  },
  methods: {
    handleSearch(searchTerm) {
      console.log("Search term:", searchTerm);
    },
    handleLogin() {
      console.log("Login clicked");
    },
    handleDownload() {
      console.log("Download clicked");
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

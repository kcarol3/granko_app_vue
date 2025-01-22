<template>
  <div class="menu">
  <div :class="['left-menu', { collapsed: isCollapsed }]">
    <div style="float: left; font-size: 1.5rem; margin-right: 10px">
      <font-awesome-icon icon="bars" @click="toggleMenu" />
    </div>
    <div v-if="!isCollapsed" class="menu-content">
      <div class="menu-title">
        <font-awesome-icon icon="gamepad" class="main-icon" />
      </div>
      <ul class="menu-list">
        <li
            v-for="(item, index) in menuItems"
            :key="index"
            class="menu-item"
            @click="onMenuClick(item)"
        >
          <div>
            <font-awesome-icon :icon="item.icon" class="icon" />
            {{ item.label }}
          </div>
        </li>
      </ul>
    </div>
  </div>
  </div>
</template>

<script>
import {jwtDecode} from "jwt-decode";

export default {
  name: "LeftMenu",
  props: {
    title: {
      type: String,
      default: "Menu",
      role: String
    },
    menuItems: {
      type: Array,
      required: true, // Oczekujemy tablicy obiektów, np. [{ label: "Home", icon: "fa fa-home", route: "/home" }]
    },
  },
  data() {
    return {
      userRole: null,
      isCollapsed: false, // Kontroluje widoczność menu
    };
  },
  created() {
    const token = localStorage.getItem('authToken');
    if (token) {
      const decoded = jwtDecode(token);
      this.userRole = decoded.role;
    }
  },
  methods: {
    toggleMenu() {
      this.isCollapsed = !this.isCollapsed; // Przełącza stan menu
    },
    onMenuClick(item) {
      this.$emit("menuClick", item);
      if (item.route) {
        this.$router.push(item.route);
      }
    },
  },
};
</script>

<style scoped>
.menu {
  height: 100vh;
}
.left-menu {
  width: 260px;
  background-image: linear-gradient(to right, rgba(98, 255, 0, 0.47), #0b2201);
  color: white;
  height: fit-content;
  padding: 20px 20px 40px;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  position: relative;
  transition: width 0.3s ease;
  overflow: hidden;
  border-radius: 0 0 40px 0;
}

.left-menu.collapsed {
  width: 70px; /* Szerokość menu po zwinięciu */
}

.toggle-button {
  position: absolute;
  top: 1rem;
  right: -1.5rem;
  width: 30px;
  height: 30px;
  border: none;
  border-radius: 50%;
  background-color: #004547;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.toggle-button:hover {
  transform: scale(1.1);
}

.menu-content {
  transition: opacity 0.3s ease;
}

.left-menu.collapsed .menu-content {
  opacity: 0;
  pointer-events: none;
}

.icon {
  margin-right: 5px;
}

.menu-title {
  font-size: 1.5rem;
  margin-bottom: 5rem;
  text-align: center;
}

.menu-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.menu-item {
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-size: 1.4rem;
  transition: transform 0.3s ease;
}

.menu-item:hover {
  background-color: #0b2201;
  transform: scale(1.1);
}

.menu-item:active {
  transform: scale(1.05);
}

.main-icon {
  transform: rotate(-45deg);
  color: #62ff00;
  font-size: 2rem;
  margin-left: 0.2rem;
}
</style>

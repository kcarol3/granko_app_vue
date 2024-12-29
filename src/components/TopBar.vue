<template>
  <div class="top-bar">
    <div>
      <button class="login-button m-1" style="width: 80px" @click="onLogin">
        <span style="visibility: hidden">.</span><font-awesome-icon icon="search"/><span style="visibility: hidden">.</span>
      </button>
      <label id="searchLabel" for="search" style="visibility: hidden">.</label>
      <input
          id="search"
          type="text"
          class="search-input"
          placeholder="Search..."
          @input="onSearch"
      />
    </div>
    <div class="buttons">
      <button class="font-buttons" style="font-size: 24px" @click="emitDecrease"><strong>A-</strong></button>
      <button class="font-buttons" style="font-size: 28px; margin-right: 20px" @click="emitIncrease"><strong>A+</strong></button>
      <button class="login-button" @click="onLogin">Log in</button>
      <button class="download-button" @click="onDownload">Download<font-awesome-icon style="margin-left: 5px" icon="download"/></button>
    </div>
  </div>
</template>

<script>
export default {
  name: "TopBar",
  methods: {
    onSearch(event) {
      const searchTerm = event.target.value;
      this.$emit("search", searchTerm); // Emituje zdarzenie do rodzica
    },
    onLogin() {
      this.$router.push('/login')
    },
    onDownload() {
      this.$emit("download"); // Emituje zdarzenie pobierania
    },
    emitIncrease() {
      this.$emit('increase'); // Emituje zdarzenie 'increase'
    },
    emitDecrease() {
      this.$emit('decrease'); // Emituje zdarzenie 'decrease'
    },
  },
};
</script>

<style scoped>
.top-bar {
  width: 100%;
  max-height: 60px;
  background-image: linear-gradient(#004547, #0b2201);
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 16px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.search-input {
  padding: 8px;
  background-image: linear-gradient(#004547, #0b2201);
  font-size: 1.2rem;
  border: none;
  border-radius: 4px;
  flex: 1;
  width: 600px;
  margin-right: 16px;
  margin-left: 16px;
  color: white;
}

.buttons {
  display: flex;
  gap: 8px;
}

.font-buttons {
  color: #62ff00;
  cursor: pointer;
  background-color: Transparent;
  background-repeat:no-repeat;
  border: none;
}

.login-button,
.download-button {
  background-color: #62ff00;
  color: #004547;
  border: none;
  padding: 8px 16px;
  border-radius: 15px;
  font-size: 1.2rem;
  cursor: pointer;
  width: 160px;
  transition: background-color 0.3s ease;
}

.login-button:hover,
.download-button:hover {
  background-color: #47cc00;
}

.login-button:active,
.download-button:active {
  background-color: #36a800;
}
</style>

<template>
  <div>
    <div>
      <div class="back-button" @click="goBack()"><font-awesome-icon icon="arrow-left"/> Go back</div>
      <div style="display: flex; justify-content: space-between;">
        <div class="user-info">
          <h1 style="color: #62ff00">Welcome, {{ user.name }}!</h1>
          <p>Email: {{ user.email }}</p>
          <p>Membership Level: {{ user.membership }}</p>
        </div>

        <div class="game-execution">
          <label for="code" style="color: white; font-size: 2rem">Execute Your Game Code</label>
          <input id="code" v-model="gameCode" placeholder="Enter code here in format XXXX-XXXX-XXXX..." class="code-input">
          <button @click="executeCode">Run Code</button>
          <div class="execution-result" :style="errorStyle" v-if="executionResult">
            <h3>Execution Result:</h3>
            <p>{{ executionResult }}</p>
          </div>
        </div>
      </div>

      <div class="available-games">
        <h2>Library</h2>
        <div class="game-list">
          <div v-for="(game, index) in games" :key="index" class="game-item">
            <h3>{{ game.title }}</h3>
            <button @click="selectGame(index)">Play</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserGamePage",

  data() {
    return {
      user: {
        name: "Jane Doe",
        email: "jane.doe@example.com",
        membership: "Premium",
      },
      errorStyle: {},
      games: [
        { title: "The Knights - New Era", price: "Free" },
        { title: "Fun in the Sun", price: "$59.99" },
        { title: "Cyberverse", price: "$19.99" },
        { title: "Dreamscape", price: "$39.99" },
      ],
      gameCode: "",
      executionResult: "",
    };
  },

  methods: {
    goBack(){
      this.$router.back();
    },
    executeCode() {
      const codeFormat = /^[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/;
      if (this.gameCode.trim() === "") {
        this.executionResult = "Error: No code provided.";
        this.errorStyle = { backgroundColor: "#ffe7e7", border: "1px solid #ffb2b2" };

        return;
      }
      if (!codeFormat.test(this.gameCode)) {
        this.executionResult = "Error: Invalid code format. Please use XXXX-XXXX-XXXX.";
        this.errorStyle = {backgroundColor: "#ffe7e7", border: "1px solid #ffb2b2"};
        return;
      }
        this.errorStyle = {};
        this.executionResult = `Code executed successfully! Game will be added to your library`;
    },

    selectGame(index) {
      alert(`You selected ${this.games[index].title}. Enjoy your game!`);
    },
  },
};
</script>

<style scoped>
.user-info {
  color:white;
  width: 48%;
  height: 13rem;
  background-color: #004547;
  border-radius: 1.5rem;
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.9);
  padding: 1rem;
  margin-bottom: 2rem;
}

.game-execution {
  margin-bottom: 2rem;
  width: 48%;
}

.code-input {
  margin-bottom: 1rem;
  padding: 0.5rem;
  width: 30rem;
  font-family: monospace;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.execution-result {
  background-color: #e7ffe7;
  padding: 0.5rem;
  border: 1px solid #b2ffb2;
  border-radius: 4px;
  width: 100%;
}

.available-games {
  margin-top: 1rem;
}

.game-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  width: 48%
}

.game-item {
  padding: 0.5rem;
  background-color: #18401c;
  border: 1px solid #62ff00;
  border-radius: 8px;
  max-width: 20rem;
  color: white;
}

button {
  background-color: #62ff00;
  color: #004547;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 15px;
  font-size: 1.2rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-left: 5px;
}

button:hover {
  background-color: #45a049;
}

h2 {
  color: white
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

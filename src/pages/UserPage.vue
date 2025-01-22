<template>
  <div>
    <div>
      <div class="back-button" @click="goBack()"><font-awesome-icon icon="arrow-left"/> Go back</div>
      <div style="margin: auto">
        <div class="user-info">
          <h1 style="color: #62ff00">Welcome, {{ user.username }}!</h1>
          <p>Email: {{ user.email }}</p>
            <button @click="openModal">Edit User</button>

            <!-- Modal -->
            <div v-if="isModalOpen" class="modal-overlay">
                <div class="modal-content">
                    <h2 style="color: #102b12">Edit User</h2>
                    <form @submit.prevent="updateUser">
                        <div class="form-group">
                            <label for="username">Username:</label>
                            <input type="text" id="username" v-model="user.username" required />
                        </div>
                        <div class="form-group">
                            <label for="email">Email:</label>
                            <input type="email" id="email" v-model="user.email" required />
                        </div>
                        <div class="modal-actions">
                            <button type="submit" class="save-button">Save and logout</button>
                            <button type="button" class="cancel-button" @click="closeModal">Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

<!--        <div class="game-execution">-->
<!--          <label for="code" style="color: white; font-size: 2rem">Execute Your Game Code</label>-->
<!--          <input id="code" v-model="gameCode" placeholder="Enter code here in format XXXX-XXXX-XXXX..." class="code-input">-->
<!--          <button @click="executeCode">Run Code</button>-->
<!--          <div class="execution-result" :style="errorStyle" v-if="executionResult">-->
<!--            <h3>Execution Result:</h3>-->
<!--            <p>{{ executionResult }}</p>-->
<!--          </div>-->
<!--        </div>-->
      </div>

      <div class="available-games">
        <h2 style="margin: auto">Library</h2>
        <div class="game-list">
          <div v-for="(game, index) in this.games" :key="index" class="game-item">
            <h3>{{ game.title }}</h3>
            <h4>{{ game.subTitle }}</h4>
              <button @click="selectGame(index)">Play</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {jwtDecode} from "jwt-decode";

export default {
  name: "UserGamePage",

  data() {
    return {
        isModalOpen: false,
        user: {
            username: "",
            email: "",
        },
      errorStyle: {},
      games: [
      ],
      gameCode: "",
      executionResult: "",
    };
  },

    created() {
      this.getUser();
      this.getUserGames()
    },

    methods: {
        openModal() {
            // Otwórz modal
            this.isModalOpen = true;

        },
        closeModal() {
            // Zamknij modal
            this.isModalOpen = false;
        },
        updateUser() {
            const token = localStorage.getItem("authToken");
            this.$axios.put("http://localhost:8080/user", {
                id: this.user.id,
                username: this.user.username,
                email: this.user.email,
            },{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(() => {
                    this.$moshaToast('Success',
                        {
                            showIcon: 'true',
                            type: 'success',
                        })
                    this.closeModal();
                    localStorage.removeItem("authToken");
                    this.$router.push({ path: "/login" });
                    this.$emit("checkLoginStatus")
                })
                .catch((error) => {
                    console.error("Error updating user:", error);
                });
        },
      getUser() {
          if (localStorage.getItem("authToken")) {
              const token = localStorage.getItem("authToken");
              if (token) {
                  const decoded = jwtDecode(token);
                  this.$axios.get(`http://localhost:8080/user/${decoded.username}`, {
                      headers: {
                          Authorization: `Bearer ${token}`
                      }
                  }).then((response) => {
                      this.user = response.data;
                      console.log(response.data);
                  }).catch((error) => {
                      console.error('Error fetching cart data:', error);
                  });
              }
          }
      },
        getUserGames() {
            if (localStorage.getItem("authToken")) {
                const token = localStorage.getItem("authToken");
                if (token) {
                    const decoded = jwtDecode(token);
                    this.$axios.get(`http://localhost:8080/user/games/${decoded.userId}`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }).then((response) => {
                        this.games = response.data;
                    }).catch((error) => {
                        console.error('Error fetching cart data:', error);
                    });
                }
            }
        },
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
  margin: auto;

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
  width: 48%;
    margin: auto;
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

.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.modal-content {
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    width: 400px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.form-group {
    margin-bottom: 15px;
}

label {
    display: block;
    margin-bottom: 5px;
}

input {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

.modal-actions {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
}

.edit-button,
.save-button,
.cancel-button {
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.edit-button {
    background-color: #007bff;
    color: white;
}

.save-button {
    background-color: #28a745;
    color: white;
}

.cancel-button {
    background-color: #dc3545;
    color: white;
}

.save-button:hover,
.cancel-button:hover,
.edit-button:hover {
    opacity: 0.9;
}
</style>

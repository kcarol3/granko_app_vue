<template>
    <div class="edit-game-form">
        <h1>Edit Game</h1>
        <form @submit.prevent="submitGame">
            <div>
                <label for="title">Title</label>
                <input id="title" v-model="game.title" type="text" required/>
            </div>
            <div>
                <label for="subtitle">Subtitle</label>
                <input id="subtitle" v-model="game.subTitle" type="text" required/>
            </div>
            <label for="genre">Select Type:</label>
            <select id="genre" v-model="selectedGenre">
                <option v-for="option in genres" :key="option.text" :value="option.value">
                    {{ option.text }}
                </option>
            </select>
            <div>
                <label for="price">Price (USD)</label>
                <input id="price" v-model="game.price" type="number" step="0.01" required/>
            </div>
            <div>
                <label for="free">Is free</label>
                <input type="checkbox" id="free" v-model="game.free">
            </div>
            <button class="btn-submit" type="submit">Edit Game</button>
        </form>
        <form @submit.prevent="uploadImage" style="margin-top: 10px">
            <div>
                <label for="image">Upload Image</label>
                <input id="image" type="file" @change="handleFileUpload"/>
            </div>
            <button class="btn-submit" type="submit" :disabled="!imageFile">Upload Image</button>
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            selectedGenre: null, // Domyślnie wybrana opcja
            genres: [
                {text: "ADVENTURE", value: "ADVENTURE"},
                {text: "RPG", value: "RPG"},
                {text: "ACTION", value: "ACTION"},
                {text: "SCIFI", value: "SCIFI"},
            ], // Lista opcji
            game: {
                id: null,
                title: "",
                subTitle: "",
                alt: "",
                price: 0,
                free: true
            },
            imageFile: null,
        };
    },
    mounted() {
        this.getGame();
    },
    created() {
        this.getGame();
    },
    methods: {
        getGame() {
            const token = localStorage.getItem("authToken");
            if (token) {
                this.$axios.get(`http://127.0.0.1:8080/games/${this.$route.params.id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }).then((response) => {
                    this.game = response.data;
                    this.selectedGenre = response.data.type
                })
            }
        },
        submitGame() {
            const token = localStorage.getItem("authToken");
            this.$axios
                .put(`http://localhost:8080/admin/game/${this.game.id}`, {
                        title: this.game.title,
                        subTitle: this.game.subTitle,
                        alt: this.game.alt,
                        price: this.game.price,
                        free: this.game.free,
                        type: this.selectedGenre
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    })
                .then((response) => {
                    console.log(response.data);
                    this.$moshaToast("Success",
                        {
                            showIcon: 'true',
                            type: 'success',
                        })
                })
                .catch((error) => {
                    console.error("Error adding game:", error);
                });
        },
        handleFileUpload(event) {
            this.imageFile = event.target.files[0];
        },
        uploadImage() {
            const formData = new FormData();
            formData.append("file", this.imageFile);
            formData.append("gameId", this.game.id);
            formData.append("name", this.game.alt);
            const token = localStorage.getItem("authToken");
            this.$axios
                .post(`http://localhost:8080/images`, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${token}`
                    },
                })
                .then((response) => {
                    console.log(response.data);
                    this.$moshaToast("Success",
                        {
                            showIcon: 'true',
                            type: 'success',
                        })
                })
                .catch((error) => {
                    console.error("Error uploading image:", error);
                });
        },
    },
};
</script>

<style scoped>

.edit-game-form {
    width: 100%;
    max-width: 400px;
    margin: 0 auto;
    background-color: #0b2201;
    padding: 2rem;
    border-radius: 24px;
    box-shadow: 0 8px 16px rgba(39, 55, 40, 0.53);
}

.auth-form {
    width: 100%;
    max-width: 400px;
    margin: 0 auto;
    background-color: #0b2201;
    padding: 2rem;
    border-radius: 24px;
    box-shadow: 0 8px 16px rgba(39, 55, 40, 0.53);
}

h1 {
    text-align: left;
    color: #47cc00;
}

.form-group {
    margin-bottom: 1rem;
}

label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: bold;
    color: white;
}

input, select {
    width: 100%;
    padding: 0.5rem;
    background-color: #323232;
    border: 1px solid #ccc;
    color: white;
    border-radius: 4px;
    font-size: 1rem;
    margin-bottom: 10px;
}

.btn-submit {
    background-color: #62ff00;
    color: #004547;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 15px;
    font-size: 1.2rem;
    cursor: pointer;
    width: 100%;
    margin-top: 1rem;
    transition: background-color 0.3s ease;
}

.btn-submit:hover {
    background-color: #47cc00;
}

.btn-submit:active {
    background-color: #36a800;
}

.toggle-mode {
    text-align: center;
    margin-top: 1rem;
    color: white;
}

.btn-sec {
    background-color: #18401c;
    color: #47cc00;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 15px;
    font-size: 1.2rem;
    cursor: pointer;
    width: 80%;
    margin-top: 1rem;
    transition: background-color 0.3s ease;
}

.btn-sec:hover {
    background-color: #102b12;
}

.btn-sec:active {
    background-color: #18401c;
}
</style>

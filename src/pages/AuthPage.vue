<template>
  <div class="auth-form">
    <h1>{{ isLoginMode ? "Log In" : "Register" }}</h1>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="email">Email</label>
        <input
            type="email"
            id="email"
            v-model="formData.email"
            placeholder="Enter your email"
            required
        />
      </div>

      <div class="form-group">
        <label for="password">Password</label>
        <input
            type="password"
            id="password"
            v-model="formData.password"
            placeholder="Enter your password"
            required
        />
      </div>

      <div v-if="!isLoginMode" class="form-group">
        <label for="confirmPassword">Confirm Password</label>
        <input
            type="password"
            id="confirmPassword"
            v-model="formData.confirmPassword"
            placeholder="Confirm your password"
            required
        />
      </div>

      <button type="submit" class="btn-submit">
        {{ isLoginMode ? "Log In" : "Register" }}
      </button>
    </form>

    <div class="toggle-mode">
      <div>OR</div>
      <button @click="toggleMode" class="btn-sec">
        {{ isLoginMode ? "Register" : "Log In" }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "AuthForm",
  data() {
    return {
      isLoginMode: true, // Przełącznik między trybem logowania a rejestracji
      formData: {
        email: "",
        password: "",
        confirmPassword: "", // Używane tylko podczas rejestracji
      },
    };
  },
  methods: {
    toggleMode() {
      this.isLoginMode = !this.isLoginMode;
      this.resetForm();
    },
    handleSubmit() {
      if (!this.isLoginMode && this.formData.password !== this.formData.confirmPassword) {
        alert("Passwords do not match!");
        return;
      }

      const action = this.isLoginMode ? "Log In" : "Register";
      console.log(`${action} data:`, this.formData);
      // Tutaj możesz wywołać API dla logowania/rejestracji
      alert(`${action} successful!`);
    },
    resetForm() {
      this.formData = {
        email: "",
        password: "",
        confirmPassword: "",
      };
    },
  },
};
</script>

<style scoped>
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
  margin-bottom: 3rem;
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

input {
  width: 100%;
  padding: 0.5rem;
  background-color: #323232;
  border: 1px solid #ccc;
  color: white;
  border-radius: 4px;
  font-size: 1rem;
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

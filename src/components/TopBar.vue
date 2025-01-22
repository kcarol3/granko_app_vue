<template>
  <div class="top-bar">
    <div class="buttons">
      <button v-if="isLoggedIn" class="logout-button" @click="emitLogout">Log Out</button>
      <button v-else class="login-button" @click="emitLogin">Log In</button>
      <button class="cart-button" @click="emitCartModal">
        <font-awesome-icon icon="shopping-cart"/>
        Cart ({{ cart.length }})
      </button>
      <div>
        <button class="font-buttons" style="font-size: 24px" @click="emitDecrease"><strong>A-</strong></button>
        <button class="font-buttons" style="font-size: 28px; margin-right: 20px" @click="emitIncrease">
          <strong>A+</strong></button>
      </div>

    </div>

    <div v-if="isCartModalOpen" class="cart-modal">
      <div class="cart-modal-content">
        <h2>Your Cart</h2>
        <ul class="cart-items">
          <li v-for="(item, index) in cart" :key="index" class="cart-item">
            <span>{{ item.title }}</span>
            <span>{{ item.price }} USD</span>
            <button class="remove-button" @click="removeFromCart(item.id)">Remove</button>
          </li>
        </ul>
        <button class="close-button" @click="emitCloseCartModal">Close</button>
        <button class="login-button" @click="accept">Accept</button>
      </div>
    </div>
  </div>
</template>

<script>


export default {
  name: "TopBar",
  props: {
    isLoggedIn: Boolean,
    isCartModalOpen: Boolean,
    cart: Array,
  },
  // data() {
  //   return {
  //     isLoggedIn: false,
  //     isCartModalOpen: false,
  //     cart: [],
  //   };
  // },

  methods: {
      accept() {
          this.$emit("accept");
      },
    emitCloseCartModal(){
      this.$emit('closeCartModal');
    },
    removeFromCart(id) {
      this.$emit('removeFromCart', id);
    },
    emitCartModal(){
      this.$emit('openCartModal');
    },
    emitLogin() {
      this.$emit('login');
    },
    emitLogout(){
      this.$emit('logout');
    },
    emitIncrease() {
      this.$emit('increase');
    },
    emitDecrease() {
      this.$emit('decrease');
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
  padding: 8px 16px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.buttons {
  margin: auto;
  display: flex;
  justify-content: space-between;
}

.font-buttons {
  color: #62ff00;
  cursor: pointer;
  background-color: Transparent;
  border: none;
}

.login-button,
.logout-button,
.cart-button {
  background-color: #62ff00;
  color: #004547;
  border: none;
  padding: 8px 16px;
  border-radius: 15px;
  font-size: 1.2rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.login-button:hover,
.logout-button:hover,
.cart-button:hover {
  background-color: #47cc00;
}

.login-button:active,
.logout-button:active,
.cart-button:active {
  background-color: #36a800;
}

.cart-modal {
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

.cart-modal-content {
  background-color: white;
  color: black;
  width: 90%;
  max-width: 500px;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.cart-items {
  list-style-type: none;
  padding: 0;
}

.cart-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0;
}

.remove-button {
  background-color: #ff4d4d;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.remove-button:hover {
  background-color: #e60000;
}

.close-button {
  margin-top: 20px;
  background-color: #ffffff;
  color: #004547;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
}

.close-button:hover {
  background-color: rgba(255, 255, 255, 0.7);
}
</style>

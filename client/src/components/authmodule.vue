<template>
  <div class="auth-demo">
    <h1>{{ isLogin ? (isAdmin ? "Admin Login" : "User Login") : "Register" }}</h1>
    <form @submit.prevent="handleSubmit">
      <div>
        <label for="username">Username:</label>
        <input v-model="form.username" id="username" type="text" required />
      </div>
      <div>
        <label for="password">Password:</label>
        <input v-model="form.password" id="password" type="password" required />
      </div>
      <div v-if="!isLogin">
        <label for="email">Email:</label>
        <input v-model="form.email" id="email" type="email" required />
      </div>
      <div v-if="!isLogin">
        <label for="confirm-password">Confirm Password:</label>
        <input v-model="form.confirmPassword" id="confirm-password" type="password" required />
      </div>
      <div v-if="isLogin">
        <label for="role">Role:</label>
        <select v-model="form.role" id="role" required>
          <option value="User">User</option>
          <option value="Admin">Admin</option>
        </select>
      </div>
      <button type="submit">{{ isLogin ? "Login" : "Register" }}</button>
    </form>
    <p>{{ msg }}</p>
    <button @click="toggleMode">{{ isLogin ? "Switch to Register" : "Switch to Login" }}</button>
    <button
      v-if="isLogin"
      :class="{ 'admin-login': isAdmin, 'user-login': !isAdmin }"
      @click="toggleRole"
    >
      Switch to {{ isAdmin ? "User Login" : "Admin Login" }}
    </button>
    <button @click="handleLogout">Logout</button>
  </div>
</template>

<script>
export default {
  name: "AuthenticationDemo",
  data() {
    return {
      isLogin: true,
      isAdmin: false,
      form: {
        username: "",
        password: "",
        confirmPassword: "",
        role: "User",
        email: "",
      },
      msg: "",
    };
  },
  methods: {
    toggleMode() {
      this.isLogin = !this.isLogin;
      this.msg = "";
      this.resetForm();
    },
    toggleRole() {
      this.isAdmin = !this.isAdmin;
      this.form.role = this.isAdmin ? "Admin" : "User";
      this.msg = "";
    },
    resetForm() {
      this.form = {
        username: "",
        password: "",
        confirmPassword: "",
        role: "User",
        email: "",
      };
    },
    async handleSubmit() {
      try {
        const endpoint = this.isLogin ? "login" : "register";
        const params = {
          username: this.form.username,
          userpass: this.form.password,
          role: this.isLogin ? this.form.role : undefined,
          email: !this.isLogin ? this.form.email : undefined,
        };

        if (!this.isLogin && this.form.password !== this.form.confirmPassword) {
          this.msg = "Passwords do not match.";
          return;
        }

        const response = await this.sendRequest("post", endpoint, params);

        if (response.error) {
          this.msg = response.error; // Display backend error messages
        } else {
          this.msg = response.message || "Success!";
        }
      } catch (error) {
        this.msg = "An error occurred. Please try again.";
      }
    },
    async handleLogout() {
      try {
        const response = await this.sendRequest("get", "logout");
        this.msg = response.message || "Logged out successfully!";
        this.resetForm(); // Réinitialise le formulaire
        this.isLogin = true; // Revient à l'état de login par défaut
        this.isAdmin = false; // Assure que le rôle est "User"
      } catch (error) {
        this.msg = "Logout failed. Please try again.";
      }
    },
    async sendRequest(method, endpoint, params) {
      try {
        const url = `http://localhost:9000/auth/${endpoint}`;
        const options =
          method === "post"
            ? {
                method: "POST",
                body: JSON.stringify(params),
                headers: { "Content-Type": "application/json" },
              }
            : { method: "GET" };
        const response = await fetch(url, options);
        return response.json();
      } catch (error) {
        console.error("Request failed:", error);
        throw error;
      }
    },
  },
};
</script>

<style scoped>
.auth-demo {
  font-family: Arial, sans-serif;
  text-align: center;
  margin: 20px;
}

h1 {
  color: #28a745;
  margin-bottom: 20px;
}

form {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
}

label {
  font-size: 16px;
  margin-right: 10px;
}

input,
select {
  padding: 8px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 200px;
}

button {
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: #007bff;
  color: white;
  transition: all 0.3s ease;
}

button:hover {
  opacity: 0.8;
}

.admin-login {
  background-color: #007bff; /* blue for Admin */
}

.user-login {
  background-color: #007bff; /* Blue for User */
}

p {
  font-size: 18px;
  color: #555;
}
</style>

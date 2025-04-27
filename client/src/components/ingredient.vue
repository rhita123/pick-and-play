<template>
  <div class="ingredient">
    <header>
      <h1>Ingredient App</h1>
      <nav>
        <router-link to="/ingredient/list/all" class="nav-link">View Ingredients</router-link>
        <router-link v-if="userRole === 'admin'" to="/ingredient/edit/0" class="nav-link">
          Add a New Ingredient
        </router-link>
      </nav>
    </header>

    <!-- List of Ingredients -->
    <div v-if="action === 'list'" class="ingredient-list">
      <h2>Ingredient List</h2>
      <div class="card" v-for="ingredient in ingredientList" :key="ingredient.IngredientID">
        <h3>{{ ingredient.Name }}</h3>
        <p>Type: {{ ingredient.Type }}</p>
        <div class="card-buttons">
          <button v-if="userRole === 'admin'" class="btn btn-delete" @click="deleteIngredient(ingredient.IngredientID)">
            Delete
          </button>
          <router-link v-if="userRole === 'admin'" :to="`/ingredient/edit/${ingredient.IngredientID}`" class="btn btn-edit">
            Edit
          </router-link>
          <router-link :to="`/ingredient/show/${ingredient.IngredientID}`" class="btn btn-view">
            View Details
          </router-link>
        </div>
      </div>
    </div>

    <!-- Single Ingredient Details -->
    <div v-if="action === 'show'" class="ingredient-details">
      <h2>{{ oneIngredient.Name }}</h2>
      <p><strong>Type:</strong> {{ oneIngredient.Type }}</p>
      <router-link to="/ingredient/list/all" class="btn btn-view">Back to List</router-link>
    </div>

    <!-- Add/Edit Ingredient -->
    <div v-if="action === 'edit'" class="ingredient-edit">
      <h2>{{ id === "0" ? "Add New Ingredient" : "Edit Ingredient" }}</h2>
      <form @submit.prevent="saveIngredient">
        <input type="text" v-model="oneIngredient.Name" placeholder="Name" required />
        <input type="text" v-model="oneIngredient.Type" placeholder="Type" required />
        <button type="submit" class="btn btn-save">Save</button>
      </form>
    </div>

    <!-- Error Message -->
    <div v-if="error" class="error">
      <p>{{ error }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      action: "", // The current action, e.g., "list", "show", or "edit"
      id: 0, // The ID of the ingredient
      ingredientList: [], // Array of ingredients for the list
      oneIngredient: {}, // Object for a single ingredient or for editing/adding
      error: null, // Error message
      userRole: "admin", // User role: 'admin' or 'user'
    };
  },
  created() {
    this.updateFromRoute(); // Initialize the component based on the current route
  },
  methods: {
    updateFromRoute() {
      this.action = this.$route.params.action;
      this.id = this.$route.params.id;

      if (this.action === "list") {
        this.fetchIngredientList();
      } else if (this.action === "show") {
        this.fetchIngredientDetails(this.id);
      } else if (this.action === "edit") {
        if (this.id === "0") {
          this.oneIngredient = this.getBlankIngredient();
        } else {
          this.fetchIngredientDetails(this.id);
        }
      }
    },
    async fetchIngredientList() {
      try {
        const response = await this.$http.get("http://localhost:9000/ingredientapi/list");
        this.ingredientList = response.data;
      } catch (error) {
        this.error = "Error fetching ingredient list.";
        console.error(error);
      }
    },
    async fetchIngredientDetails(id) {
      try {
        const response = await this.$http.get(`http://localhost:9000/ingredientapi/show/${id}`);
        if (response.data) {
          this.oneIngredient = response.data;
        } else {
          this.error = "Ingredient not found.";
        }
      } catch (error) {
        this.error = "Error fetching ingredient details.";
        console.error(error);
      }
    },
    async deleteIngredient(id) {
      try {
        if (confirm("Are you sure you want to delete this ingredient?")) {
          await this.$http.delete(`http://localhost:9000/ingredientapi/delete/${id}`);
          this.fetchIngredientList();
        }
      } catch (error) {
        this.error = "Error deleting ingredient.";
        console.error(error);
      }
    },
    async saveIngredient() {
      try {
        if (this.id === "0") {
          await this.$http.post("http://localhost:9000/ingredientapi/add", this.oneIngredient);
        } else {
          await this.$http.put(`http://localhost:9000/ingredientapi/edit/${this.id}`, this.oneIngredient);
        }
        this.$router.push("/ingredient/list/all");
      } catch (error) {
        this.error = "Error saving ingredient.";
        console.error(error);
      }
    },
    getBlankIngredient() {
      return {
        Name: "",
        Type: "",
      };
    },
  },
  watch: {
    $route: {
      immediate: true,
      handler() {
        this.updateFromRoute();
      },
    },
  },
};
</script>

<style scoped>
/* General Styles */
.ingredient {
  font-family: Arial, sans-serif;
  text-align: center;
  margin: 20px;
}

header {
  background-color: #28a745;
  color: white;
  padding: 20px;
}

header h1 {
  margin: 0;
}

.nav-link {
  margin: 0 10px;
  color: white;
  text-decoration: none;
  font-weight: bold;
}

.nav-link:hover {
  text-decoration: underline;
}

/* Ingredient List */
.ingredient-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}

.card {
  background: #f9f9f9;
  border: 1px solid #ccc;
  border-radius: 10px;
  width: 250px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.card h3 {
  font-size: 20px;
  margin: 10px 0;
}

.card p {
  font-size: 16px;
  margin: 5px 0;
}

.btn {
  display: inline-block;
  margin: 5px;
  padding: 8px 12px;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  font-weight: bold;
}

.btn-delete {
  background-color: #dc3545;
}

.btn-delete:hover {
  background-color: #c82333;
}

.btn-edit {
  background-color: #007bff;
}

.btn-edit:hover {
  background-color: #0056b3;
}

.btn-view {
  background-color: #28a745;
}

.btn-view:hover {
  background-color: #218838;
}

/* Error Message */
.error {
  color: red;
  font-weight: bold;
  margin-top: 20px;
}
</style>

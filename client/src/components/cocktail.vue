
<template>
  <div class="cocktail">
    <header>
      <h1>Cocktail App</h1>
      <nav>
        <router-link to="/cocktail/list/all" class="nav-link">View Cocktails</router-link>
        <router-link v-if="userRole === 'admin'" to="/cocktail/edit/0" class="nav-link">Add a New Cocktail</router-link>
      </nav>
    </header>

    <!-- List of Cocktails -->
    <div v-if="action === 'list'" class="cocktail-list">
      <h2>Cocktail List</h2>
      <div class="card" v-for="cocktail in cocktailList" :key="cocktail.CocktailID">
        <h3>{{ cocktail.Name }}</h3>
        <p>Category: {{ cocktail.Category }}</p>
        <div class="card-buttons">
          <button
            v-if="userRole === 'admin'"
            class="btn btn-delete"
            @click="deleteCocktail(cocktail.CocktailID)">
            Delete
          </button>
          <router-link v-if="userRole === 'admin'" :to="`/cocktail/edit/${cocktail.CocktailID}`" 
            class="btn btn-edit">
            Edit
          </router-link>
          <router-link :to="`/cocktail/show/${cocktail.CocktailID}`"
            class="btn btn-view">

            View Details
          </router-link>
        </div>
      </div>
    </div>

    <!-- Single Cocktail Details -->
    <div v-if="action === 'show'" class="cocktail-details">
      <h2>{{ oneCocktail.Name }}</h2>
      <p><strong>Category:</strong> {{ oneCocktail.Category }}</p>
      <p><strong>Origin:</strong> {{ oneCocktail.Origin }}</p>
      <p><strong>Preparation Time:</strong> {{ oneCocktail.PreparationTime }} minutes</p>
      <p><strong>Difficulty:</strong> {{ oneCocktail.Difficulty }}</p>
      <router-link to="/cocktail/list/all" class="btn">Back to List</router-link>
    </div>

    <!-- Add/Edit Cocktail -->
    <div v-if="action === 'edit'" class="cocktail-edit">
      <h2>{{ id === "0" ? "Add New Cocktail" : "Edit Cocktail" }}</h2>
      <form @submit.prevent="saveCocktail">
        <input type="text" v-model="oneCocktail.Name" placeholder="Name" required />
        <input type="text" v-model="oneCocktail.Category" placeholder="Category" required />
        <input type="number" v-model="oneCocktail.PreparationTime" placeholder="Preparation Time" required />
        <input type="text" v-model="oneCocktail.Difficulty" placeholder="Difficulty" required />
        <input type="text" v-model="oneCocktail.Origin" placeholder="Origin" required />
        <button type="submit" class="btn">Save</button>
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
      id: 0, // The ID of the cocktail
      cocktailList: [], // Array of cocktails for the list
      oneCocktail: {}, // Object for a single cocktail or for editing/adding
      error: null, // Error message
      userRole: "admin", //  ('user' or'admin')
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
        this.fetchCocktailList();
      } else if (this.action === "show") {
        this.fetchCocktailDetails(this.id);
      } else if (this.action === "edit") {
        if (this.id === "0") {
          this.oneCocktail = this.getBlankCocktail();
        } else {
          this.fetchCocktailDetails(this.id);
        }
      }
    },
    async fetchCocktailList() {
      try {
        const response = await this.$http.get("http://localhost:9000/cocktailsapi/list");
        this.cocktailList = response.data;
      } catch (error) {
        this.error = "Error fetching cocktail list.";
        console.error(error);
      }
    },
    async fetchCocktailDetails(id) {
      try {
        const response = await this.$http.get(`http://localhost:9000/cocktailsapi/show/${id}`);
        if (response.data) {
          this.oneCocktail = response.data;
        } else {
          this.error = "Cocktail not found.";
        }
      } catch (error) {
        this.error = "Error fetching cocktail details.";
        console.error(error);
      }
    },
    async deleteCocktail(id) {
      try {
        if (confirm("Are you sure you want to delete this cocktail?")) {
          await this.$http.delete(`http://localhost:9000/cocktailsapi/del/${id}`);
          this.fetchCocktailList();
        }
      } catch (error) {
        this.error = "Error deleting cocktail.";
        console.error(error);
      }
    },
    async saveCocktail() {
      try {
        const payload = {
          name: this.oneCocktail.Name,
          category: this.oneCocktail.Category,
          preparation_time: this.oneCocktail.PreparationTime,
          difficulty: this.oneCocktail.Difficulty,
          origin: this.oneCocktail.Origin,
        };

        if (this.id === "0") {
          await this.$http.post("http://localhost:9000/cocktailsapi/add", payload);
          alert("Cocktail added successfully!");
        } else {
          await this.$http.post(`http://localhost:9000/cocktailsapi/update/${this.id}`, payload);
          alert("Cocktail updated successfully!");
        }

        this.error = null;
        this.$router.push("/cocktail/list/all");
      } catch (error) {
        this.error = "Error saving cocktail. Please try again.";
        console.error(error);
      }
    },
    getBlankCocktail() {
      return {
        Name: "",
        Category: "",
        PreparationTime: 0,
        Difficulty: "",
        Origin: "",
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
.cocktail {
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

/* Cocktail List */
.cocktail-list {
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
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

.card h3 {
  font-size: 18px;
  margin: 10px 0;
}

.card p {
  font-size: 14px;
  margin: 5px 0;
  text-align: center;
}

.card-buttons {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 10px;
}

/* Button Styles */
.btn {
  display: inline-block;
  padding: 8px 16px;
  font-weight: bold;
  text-decoration: none;
  border-radius: 5px;
  text-align: center;
  color: white;
  cursor: pointer;
  width: 80px;
}

.btn-view {
  background-color: #28a745;
}

.btn-view:hover {
  background-color: #218838;
}

.btn-edit {
  background-color: #007bff;
}

.btn-edit:hover {
  background-color: #0056b3;
}

.btn-delete {
  background-color: #dc3545;
}

.btn-delete:hover {
  background-color: #c82333;
}

/* Cocktail Details */
.cocktail-details {
  margin-top: 20px;
}

.cocktail-details h2 {
  font-size: 24px;
  margin-bottom: 10px;
}

.cocktail-details p {
  font-size: 16px;
  margin: 5px 0;
}

/* Error Message */
.error {
  color: red;
  font-weight: bold;
  margin-top: 20px;
}
</style>

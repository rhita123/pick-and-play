
<template>
  <div class="restaurant">
    <header>
      <h1>Restaurant App</h1>
      <nav>
        <router-link to="/restaurant/list/all" class="nav-link">View Restaurants</router-link>
        <router-link v-if="userRole === 'admin'" to="/restaurant/edit/0" class="nav-link">Add a New Restaurant</router-link>
      </nav>
    </header>

    <!-- List of Restaurants -->
    <div v-if="action === 'list'" class="restaurant-list">
      <h2>Restaurant List</h2>
      <div class="card" v-for="restaurant in restaurantList" :key="restaurant.RestaurantID">
        <h3>{{ restaurant.Name }}</h3>
        <p>Location: {{ restaurant.Location }}</p>
        <div class="card-buttons">
          <button
            v-if="userRole === 'admin'"
            class="btn btn-delete"
            @click="deleteRestaurant(restaurant.RestaurantID)"
          >
            Delete
          </button>
          <router-link
            v-if="userRole === 'admin'"
            :to="`/restaurant/edit/${restaurant.RestaurantID}`"
            class="btn btn-edit"
          >
            Edit
          </router-link>
          <router-link
            :to="`/restaurant/show/${restaurant.RestaurantID}`"
            class="btn btn-view"
          >
            View Details
          </router-link>
        </div>
      </div>
    </div>

    <!-- Single Restaurant Details -->
    <div v-if="action === 'show'" class="restaurant-details">
      <h2>{{ oneRestaurant.Name }}</h2>
      <p><strong>Location:</strong> {{ oneRestaurant.Location }}</p>
      <p><strong>Category:</strong> {{ oneRestaurant.Category }}</p>
      <router-link to="/restaurant/list/all" class="btn">Back to List</router-link>
    </div>

    <!-- Add/Edit Restaurant -->
    <div v-if="action === 'edit'" class="restaurant-edit">
      <h2>{{ id === "0" ? "Add New Restaurant" : "Edit Restaurant" }}</h2>
      <form @submit.prevent="saveRestaurant">
        <input type="text" v-model="oneRestaurant.Name" placeholder="Name" required />
        <input type="text" v-model="oneRestaurant.Location" placeholder="Location" required />
        <input type="text" v-model="oneRestaurant.Category" placeholder="Category" required />
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
      action: "",
      id: 0,
      restaurantList: [],
      oneRestaurant: {},
      error: null,
      userRole: "admin", // ('user' ou 'admin')
    };
  },
  created() {
    this.updateFromRoute();
  },
  methods: {
    updateFromRoute() {
      this.action = this.$route.params.action;
      this.id = this.$route.params.id;

      if (this.action === "list") {
        this.fetchRestaurantList();
      } else if (this.action === "show") {
        this.fetchRestaurantDetails(this.id);
      } else if (this.action === "edit") {
        if (this.id === "0") {
          this.oneRestaurant = this.getBlankRestaurant();
        } else {
          this.fetchRestaurantDetails(this.id);
        }
      }
    },
    async fetchRestaurantList() {
      try {
        const response = await this.$http.get("http://localhost:9000/restaurantapi/list");
        this.restaurantList = response.data;
      } catch (error) {
        this.error = "Error fetching restaurant list.";
        console.error(error);
      }
    },
    async fetchRestaurantDetails(id) {
      try {
        const response = await this.$http.get(`http://localhost:9000/restaurantapi/show/${id}`);
        this.oneRestaurant = response.data;
      } catch (error) {
        this.error = "Error fetching restaurant details.";
        console.error(error);
      }
    },
    async deleteRestaurant(id) {
      try {
        if (confirm("Are you sure you want to delete this restaurant?")) {
          await this.$http.delete(`http://localhost:9000/restaurantapi/del/${id}`);
          this.fetchRestaurantList();
        }
      } catch (error) {
        this.error = "Error deleting restaurant.";
        console.error(error);
      }
    },
    async saveRestaurant() {
      try {
        const payload = {
          name: this.oneRestaurant.Name,
          location: this.oneRestaurant.Location,
          category: this.oneRestaurant.Category,
        };

        if (this.id === "0") {
          await this.$http.post("http://localhost:9000/restaurantapi/add", payload);
          alert("Restaurant added successfully!");
        } else {
          await this.$http.post(`http://localhost:9000/restaurantapi/update/${this.id}`, payload);
          alert("Restaurant updated successfully!");
        }

        this.error = null;
        this.$router.push("/restaurant/list/all");
      } catch (error) {
        this.error = "Error saving restaurant.";
        console.error(error);
      }
    },
    getBlankRestaurant() {
      return { Name: "", Location: "", Category: "" };
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
.restaurant {
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

/* Restaurant List */
.restaurant-list {
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
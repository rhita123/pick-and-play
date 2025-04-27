<template>
  <div class="employee">
    <header>
      <h1>Employee App</h1>
      <nav>
        <router-link to="/employee/list/all" class="nav-link">View Employees</router-link>
        <router-link to="/employee/edit/0" class="nav-link">Add a New Employee</router-link>
      </nav>
    </header>

    <!-- List of Employees -->
    <div v-if="action === 'list'" class="employee-list">
      <h2>Employee List</h2>
      <div class="card" v-for="employee in employeeList" :key="employee.EmployeeID">
        <h3>{{ employee.Name }}</h3>
        <p>Email: {{ employee.Email }}</p>
        <p>Status: {{ employee.Status }}</p>
        <p>Date of Birth: {{ employee.DateOfBirth }}</p>
        <button class="btn btn-delete" @click="deleteEmployee(employee.EmployeeID)">Delete</button>
        <router-link :to="`/employee/edit/${employee.EmployeesID}`" class="btn btn-edit">Edit</router-link>
        <router-link :to="`/employee/show/${employee.EmployeesID}`" class="btn btn-view">View Details</router-link>
      </div>
    </div>

    <!-- Single Employee Details -->
    <div v-if="action === 'show'" class="employee-details">
      <h2>{{ oneEmployee.Name }}</h2>
      <p><strong>Email:</strong> {{ oneEmployee.Email }}</p>
      <p><strong>Status:</strong> {{ oneEmployee.Status }}</p>
      <p><strong>Date of Birth:</strong> {{ oneEmployee.DateOfBirth }}</p>
      <router-link to="/employee/list/all" class="btn btn-view">Back to List</router-link>
    </div>

    <!-- Add/Edit Employee -->
    <div v-if="action === 'edit'" class="employee-edit">
      <h2>{{ id === "0" ? "Add New Employee" : "Edit Employee" }}</h2>
      <form @submit.prevent="saveEmployee">
        <input type="text" v-model="oneEmployee.Name" placeholder="Name" required />
        <input type="email" v-model="oneEmployee.Email" placeholder="Email" required />
        <input type="password" v-model="oneEmployee.PasswordHash" placeholder="Password" required />
        <select v-model="oneEmployee.Status">
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
          <option value="Suspended">Suspended</option>
        </select>
        <input type="date" v-model="oneEmployee.DateOfBirth" placeholder="Date of Birth" />
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
      action: "", // Current action, e.g., "list", "show", or "edit"
      id: 0, // Employee ID
      employeeList: [], // Array of employees
      oneEmployee: {}, // Single employee object
      error: null, // Error message
    };
  },
  created() {
    this.updateFromRoute(); // Initialize based on the current route
  },
  methods: {
    updateFromRoute() {
  this.action = this.$route.params.action || "list";
  this.EmployeesID = this.$route.params.EmployeesID || "0"; // Use EmployeesID

  if (this.action === "list") {
    this.fetchEmployeeList();
  } else if (this.action === "show") {
    if (this.EmployeesID !== "undefined") {
      this.fetchEmployeeDetails(this.EmployeesID);
    } else {
      this.error = "Invalid Employee ID.";
    }
  } else if (this.action === "edit") {
    if (this.EmployeesID === "0") {
      this.oneEmployee = this.getBlankEmployee();
    } else {
      this.fetchEmployeeDetails(this.EmployeesID);
    }
  }
},

    async fetchEmployeeList() {
      try {
        const response = await this.$http.get("http://localhost:9000/employeeapi/list");
        this.employeeList = response.data;
      } catch (error) {
        this.error = "Error fetching employee list.";
        console.error(error);
      }
    },
    async fetchEmployeeDetails(EmployeesID) {
  try {
    const response = await this.$http.get(`http://localhost:9000/employeeapi/show/${EmployeesID}`);
    if (response.data) {
      this.oneEmployee = response.data;
    } else {
      this.error = "Employee not found.";
    }
  } catch (error) {
    this.error = "Error fetching employee details.";
    console.error(error);
  }
},

    async deleteEmployee(EmployeesID) {
      try {
        if (confirm("Are you sure you want to delete this employee?")) {
          await this.$http.delete(`http://localhost:9000/employeeapi/del/${EmployeesID}`);
          this.fetchEmployeeList();
        }
      } catch (error) {
        this.error = "Error deleting employee.";
        console.error(error);
      }
    },
    async saveEmployee() {
      try {
        if (this.id === "0") {
          await this.$http.post("http://localhost:9000/employeeapi/add", this.oneEmployee);
        } else {
          await this.$http.put(`http://localhost:9000/employeeapi/update/${this.id}`, this.oneEmployee);
        }
        this.$router.push("/employee/list/all");
      } catch (error) {
        this.error = "Error saving employee.";
        console.error(error);
      }
    },
    getBlankEmployee() {
      return {
        Name: "",
        Email: "",
        PasswordHash: "",
        Status: "Active",
        DateOfBirth: "",
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
.employee {
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

/* Employee List */
.employee-list {
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

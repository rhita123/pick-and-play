/// controllers/auth.route.js
const express = require('express');
const passport = require('passport');
const router = express.Router();
const auth = require("../utils/users.auth");
const userRepo = require("../utils/users.repository");

// Routes
// http://localhost:9000/auth
router.get("/user", auth.authorizeRequest("USER"), userdataAction); // Accessible to USER roles
router.get("/admin", auth.authorizeRequest("ADMIN"), userdataAction); // Accessible to ADMIN roles
router.get("/protected", protectedGetAction); // Authorization within the action for resource-based auth
router.post("/login", passport.authenticate("local"), loginPostAction); // Use passport for login
router.get("/logout", logoutAction); // Logout route
router.post("/register", registerPostAction);

// Handlers
async function userdataAction(request, response) {
  if (request.isAuthenticated()) {
    response.json(request.user); // Send authenticated user details
  } else {
    response.status(401).json({ error: "Unauthorized access" });
  }
}

async function protectedGetAction(request, response) {
  // Resource-based authorization: GUEST, USER, ADMIN roles
  let content = "GUEST CONTENT"; // Default for unauthenticated users
  if (request.isAuthenticated()) {
    if (request.user.user_role === "ADMIN") {
      content = "ADMIN CONTENT";
    } else if (request.user.user_role === "USER") {
      content = "USER CONTENT";
    }
  }
  response.status(200).send(content);
}

async function loginPostAction(request, response) {
  try {
    const { role } = request.body;

    if (!role || role !== request.user.user_role) {
      // Check if the role from the client matches the user's role in the database
      return response.status(403).json({ error: "Role mismatch. Unauthorized login." });
    }

    // Passport's `req.login` ensures proper serialization into the session
    request.login(request.user, function (err) {
      if (err) {
        console.error("LOGIN ERROR:", err);
        return response.status(500).json({ loginResult: false, error: "Login failed" });
      }
      const resultObject = {
        loginResult: true,
        user: request.user,
        timestamp: new Date().toLocaleString(),
      };
      response.json(resultObject);
    });
  } catch (error) {
    console.error("LOGIN POST ERROR:", error);
    response.status(500).json({ loginResult: false, error: "An unexpected error occurred." });
  }
}


function logoutAction(request, response) {
  request.logout(function (err) {
    if (err) {
      console.error("LOGOUT ERROR:", err);
      return response.status(500).json({ logoutResult: false, error: "Logout failed" });
    }
    const resultObject = {
      logoutResult: true,
      timestamp: new Date().toLocaleString(),
    };
    response.json(resultObject);
  });
}

async function registerPostAction(request, response) {
  const { username, userpass, role = "USER", email } = request.body;

  if (!username || !userpass || !email) {
    return response.status(400).json({ error: "Missing required fields" });
  }

  try {
    const userId = await userRepo.registerUser(username, email, userpass, role);
    response.status(201).json({ message: "User registered successfully", userId });
  } catch (error) {
    console.error("Registration error:", error);
    response.status(500).json({ error: "Failed to register user" });
  }
}

module.exports = router;

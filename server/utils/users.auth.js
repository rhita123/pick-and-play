const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const userRepo = require("./users.repository");

module.exports = {
  initializeAuthentications(app) {
    app.use(passport.initialize());
    app.use(passport.session()); // Ensure sessions are enabled

    // Define LocalStrategy for username and password
    passport.use(
      new LocalStrategy(
        { usernameField: "username", passwordField: "userpass", passReqToCallback: true }, // Pass request to callback
        async (req, username, password, done) => {
          try {
            const role = req.body.role; // Extract role from request body
            const isValid = await userRepo.areValidCredentials(username, password);
    
            if (!isValid) {
              return done(null, false, { message: "Invalid credentials" });
            }
    
            const user = await userRepo.getOneUser(username);
    
            if (user.user_role !== role) {
              // Check if the user's role matches the requested role
              return done(null, false, { message: "Role mismatch" });
            }
    
            return done(null, user); // Pass user to the session
          } catch (err) {
            console.error("Error during authentication:", err);
            return done(err);
          }
        }
      )
    );
    

    // Serialize user into the session
    passport.serializeUser((userFromDb, done) => {
      console.log("SERIALIZING USER...");
      const userObj = {
        id: userFromDb.user_id,
        name: userFromDb.user_name,
        role: userFromDb.user_role, // Store only essential data
      };
      done(null, userObj);
    });

    // Deserialize user from the session
    passport.deserializeUser(async (userObj, done) => {
      console.log("DESERIALIZING USER...");
      try {
        const userFromDb = await userRepo.getOneUser(userObj.name);
        if (userFromDb) {
          done(null, userFromDb); // Attach full user details to `request.user`
        } else {
          done(null, false); // User no longer exists
        }
      } catch (err) {
        console.error("Error during deserialization:", err);
        done(err);
      }
    });
  },

  // Middleware to protect routes based on authentication and roles
  authorizeRequest(requiredRole) {
    return (req, res, next) => {
      if (req.isAuthenticated()) {
        // Check if user is authenticated
        if (requiredRole) {
          // Check if the user's role matches the required role
          if (requiredRole === req.user.user_role) {
            return next(); // Proceed if the role matches
          } else {
            return res
              .status(403)
              .json({ error: "403 Forbidden (insufficient role)" });
          }
        } else {
          return next(); // No specific role required, proceed
        }
      } else {
        return res
          .status(401)
          .json({ error: "401 Unauthorized (not authenticated)" });
      }
    };
  },
};

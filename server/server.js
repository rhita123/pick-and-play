// populate object process.env from the file .env
const dotenv = require('dotenv');
dotenv.config(); 

// create express.js webapp
const express = require('express');
const app = express();
app.set("view engine", "ejs");
app.set("views", "views");
app.listen(process.env.WEB_PORT, '0.0.0.0',
    function() { console.log("Listening on " + process.env.WEB_PORT); }
);

// *** MIDDLEWARES ***
// process form input (create request.body from POST data or json in the HTTP request)
const bodyParser = require("body-parser");
app.use(bodyParser.json(), bodyParser.urlencoded({ extended: true }));

// allow serverside session storage
const session = require("express-session");
app.use(session({
    secret: "SecretRandomStringDskghadslkghdlkghdghaksdghdksh",
    saveUninitialized: true, // Follow teacher's example for Passport
    cookie: { maxAge: 1000 * 60 * 60 * 24, httpOnly: false, secure: false }, // For development
    resave: false
}));

// enable Cross Origin Resource Sharing (needed for cross-origin API)
const cors = require('cors');

// Configure CORS to allow requests from your frontend
app.use(cors({
    origin: 'http://localhost:8080', // Allow requests from your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow specific HTTP methods
    credentials: true // Allow cookies or credentials if needed
}));


// configure passport
const passport = require("passport");
const auth = require("./utils/users.auth");
auth.initializeAuthentications(app);

// *** ROUTES/CONTROLLERS ***

// setup default route
app.get('/', (request, response) => { // 'GET' as a HTTP VERB, not as a 'getter'!
    let clientIp = request.ip;
    response.send(`Hello, dear ${clientIp}. I am a nodejs website...`);
    response.end(); // optional
});

// setup additional routes
// app.use(routeBase, callback);
app.use("/static", express.static(__dirname + '/static'));
app.use("/cocktailsapi", require("./controllers/cocktailsapi.route"));
app.use("/restaurantapi", require("./controllers/restaurantapi.route")); // Add this line for restaurant API
app.use("/employeeapi", require("./controllers/employeeapi.route"));
app.use("/ingredientapi", require("./controllers/ingredientapi.route"));

// Add the authentication route
app.use("/auth", require("./controllers/auth.route"));

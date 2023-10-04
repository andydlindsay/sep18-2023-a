const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

const app = express();
const port = 3000;

// users database
const users = {
  ghjk: {
    id: "ghjk",
    email: "a@a.com",
    password: "1234",
  },
  j9kl: {
    id: "j9kl",
    email: "b@b.com",
    password: "5678",
  },
};

// configuration
app.set("view engine", "ejs");

// middleware
app.use(morgan("dev")); // (req, res, next) => {}
app.use(express.urlencoded({ extended: false })); // creates req.body
app.use(cookieParser()); // creates req.cookies

// GET /login
app.get("/login", (req, res) => {
  res.render("login");
});

// POST /login
app.post("/login", (req, res) => {
  // grab the information from the incoming body
  const email = req.body.email;
  const password = req.body.password;

  // did they NOT submit an email and password?
  if (!email || !password) {
    return res.status(400).send("please provide an email and password");
  }

  // lookup the user based on their email address
  let foundUser = null;

  for (const userId in users) {
    const user = users[userId];
    if (user.email === email) {
      // we found our user!!
      foundUser = user;
    }
  }

  // did we NOT find a user?
  if (!foundUser) {
    return res.status(400).send("no user with that email found");
  }

  // do the passwords NOT match
  if (foundUser.password !== password) {
    return res.status(400).send("passwords do not match");
  }

  // the user is who they say they are!!!
  // set a cookie
  res.cookie("userId", foundUser.id);

  // send the user somewhere
  res.redirect("/protected");
});

// GET /protected
app.get("/protected", (req, res) => {
  // grab the information from the cookies
  const userId = req.cookies.userId;

  // do they NOT have a cookie
  if (!userId || !users[userId]) {
    return res.status(401).send("you must be logged in to see this page");
  }

  // they are signed in
  const user = users[userId];
  const templateVars = {
    email: user.email,
  };

  res.render("protected", templateVars);
});

// POST /logout
app.post("/logout", (req, res) => {
  // clear the cookie
  res.clearCookie("userId");

  // redirect somewhere
  res.redirect("/login");
});

// GET /register
app.get("/register", (req, res) => {
  res.render("register");
});

// POST /register
app.post("/register", (req, res) => {
  // grab the information from the incoming body
  const email = req.body.email;
  const password = req.body.password;

  // did they NOT submit an email and password?
  if (!email || !password) {
    return res.status(400).send("please provide an email and password");
  }

  // look for a user based on the email provided
  let foundUser = null;

  for (const userId in users) {
    const user = users[userId];
    if (user.email === email) {
      // we found a user with that email
      foundUser = user;
    }
  }

  // did we find a user?
  if (foundUser) {
    return res.status(400).send("a user with that email is already registered");
  }

  // the email must be unique
  // add the new user to the users object
  const id = Math.random().toString(36).substring(2, 6); // random 4 character string

  const user = {
    id: id,
    email: email,
    password: password,
  };

  users[id] = user;
  console.log(users);

  // send the user somewhere
  res.redirect("/login");
});

app.listen(port, () => {
  console.log(`app is listening on port ${port}`);
});

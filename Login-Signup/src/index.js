const express = require("express")
const path = require("path")
const app = express()

// Importing the LogInCollection from "./mongo"
const LogInCollection = require("./mongo")

const port =  3000

app.use(express.json())

app.use(express.urlencoded({ extended: false }))

// Setting up paths for templates and static files
const templatePath = path.join(__dirname, '../tempelates')
const publicPath = path.join(__dirname, '../public')
console.log(publicPath);

// Setting the view engine and views directory
app.set("view engine", "hbs");
app.set("views", templatePath);

app.use(express.static(publicPath));

app.get("/signup", (req, res) => {
  res.render("signup");
});


app.get("/", (req, res) => {
  res.render("login");
});

app.post("/signup", async (req, res) => {
  const { name, password } = req.body;

 
  if (!name.match(/^[a-zA-Z0-9]{6,12}$/)) {
    return res
      .status(400)
      .send(
        "Invalid username. Username should be alphanumeric and between 6-12 characters."
      );
  }

 
  if (!password.match(/^[a-zA-Z0-9!@#$%^&*]{6,}$/)) {
    return res
      .status(400)
      .send(
        "Invalid password. Password should contain alphabet, numbers, and special characters and be at least 6 characters long."
      );
  }

  try {
   
    const existingUser = await LogInCollection.findOne({ name });

    if (existingUser) {
      return res.status(409).send("Username already exists.");
    }

    const newUser = new LogInCollection({ name, password });
    await newUser.save();

    res.status(201).send("User created successfully!");
  } catch (error) {
    res.status(500).send("Error creating user.");
  }
});


app.post("/login", async (req, res) => {
  const { name, password } = req.body;

  try {
    
    const user = await LogInCollection.findOne({ name });

    if (!user) {
      return res.status(404).send("User not found.");
    }

    
    if (user.password === password) {
      return res.status(200).send("Login successful!");
    } else {
      return res.status(401).send("Incorrect password.");
    }
  } catch (error) {
    return res.status(500).send("Error logging in.");
  }
});

// Start the server and listen on the specified port
app.listen(port, () => {
    console.log('Server is running on port', port);
})

import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();

//Specifying the port the app will run on
const port = 5000;

//To link the external CSS file
app.use(express.static("public"));

// Setting the initial status to false
var userIsAuthorised = false;

app.use(bodyParser.urlencoded({ extended: true }));

//Creating custom Middleware to check if the password entered is correct, to proceed to the next block of code.
function passwordCheck(req, res, next) {
  const password = req.body["password"];
  if (password === "MyPassword") {
    userIsAuthorised = true;
  }
  next();
}
app.use(passwordCheck);

//using the .get method to respond with the home page when connecting to port 5000
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
 
});

//if the user is authorised, the website with my details will be sent to the user, if not authorised the user remain on the home page.
app.post("/check", (req, res) => {
  if (userIsAuthorised) {
    res.sendFile(__dirname + "/public/myDetails.html");
  } else {
    res.sendFile(__dirname + "/public/index.html");
    
    //Can also use res.redirect instead("/");
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

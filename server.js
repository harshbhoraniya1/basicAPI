const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "*",
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const db = require("./models/index");
const dbConfig = require("./config/db.config.js");

db.mongoose
  .connect(dbConfig.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    initial();
    console.log("Connected to the database!");
  })

app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

require("./routes/tutorial.routes")(app);
require("./routes/auth.routes")(app);

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
const Role = db.role;
function initial() {

    Role.estimatedDocumentCount().then(y=>{

      if(y == 0)
      {
          new Role({
            name: "user"
          }).save().then(y=>{

          })

          new Role({
            name: "moderator"
          }).save().then(y=>{

          })


          new Role({
            name: "admin"
          }).save().then(y=>{

          })
      }

    })


  
  }
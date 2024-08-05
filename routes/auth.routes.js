module.exports = app => {
    const auth = require("../controllers/auth.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", auth.signup);
  
    // Retrieve all Tutorials
   
    app.use('/api/auth', router);
  };
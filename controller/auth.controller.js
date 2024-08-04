const config = require("../config/auth.config");
const db = require("../models");
const { user: User, role: Role } = db;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
  });

  user.save().then((y) => {
    if (req.body.roles) {
      Role.find({
        name: { $in: req.body.roles },
      }).then((y) => {
        user.roles = y.map((role) => role._id);
        user.save().then((p) => {
          res.send({ message: "User was registered successfully!" });
        });
      });
    } else {
      Role.findOne({ name: "user" }).then((y) => {
        user.roles = [y._id];
        user.save().then((p) => {
          res.send({ message: "User was registered successfully!" });
        });
      });
    }
  });
};
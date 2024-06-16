const Users = require("../../nodetest/models/Users");
const bcrypt = require("bcrypt");
const sanitizedUsers = require("../../nodetest/util/sanitizeUsers");
const userSchema = require("../../nodetest/validation/userValidation");

//create user
exports.createUser = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  const { error } = userSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ msg: error.details[0].message });
  }

  try {
    let user = await Users.findOne({ where: { email } });
    if (user) {
      res.status(400).json({ status: 400, message: "User already exit." });
    }
    user = await Users.create({
      firstName,
      lastName,
      email,
      password,
    });
    if (user?.dataValues) {
      const userData = user.dataValues;
      delete userData.password;
      res
        .status(200)
        .json({ status: 200, message: "User saved sucessfully.", data: user });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ status: 500, message: err.message });
  }
};

// List all users
exports.getUsers = async (req, res) => {
  try {
    const getUser = await Users.findAll();
    const removeFileds = ["password", "updatedAt"];
    const updatedUsers = sanitizedUsers(getUser, removeFileds); // For remove password and extra fileds

    res.status(200).json({
      status: 200,
      message: "User fetched sucessfully.",
      data: updatedUsers,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ status: 500, message: err.message, data: "" });
  }
};

//Delete user by id
exports.deleteUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await Users.findByPk(id);
    if (!user) {
      res
        .status(404)
        .json({ status: 404, message: "User not found.", data: "" });
    }
    await user.destroy();
    res
      .status(200)
      .json({ status: 200, message: "User deleted sucessfully.", data: "" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ status: 500, message: err.message, data: "" });
  }
};

//Update user by id
exports.updatedUsersById = async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, email, password } = req.body;
  const { error } = userSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ msg: error.details[0].message });
  }

  try {
    const user = await Users.findByPk(id);
    if (!user) {
      res
        .status(404)
        .json({ status: 404, message: "User not found.", data: "" });
    }

    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;
    user.password = password; // Password will be hashed in the beforeUpdate hook

    await user.save();

    if (user?.dataValues) {
      const userData = user.dataValues;
      delete userData.password;
      res.status(200).json({
        status: 200,
        message: "User updated sucessfully.",
        data: user,
      });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ status: 500, message: err.message, data: "" });
  }
};

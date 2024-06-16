const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.post("/", userController.createUser); // Save user
router.get("/", userController.getUsers); // Get user
router.delete("/:id", userController.deleteUserById); // Delete user by id
router.put("/:id", userController.updatedUsersById); // Update user by id

module.exports = router;

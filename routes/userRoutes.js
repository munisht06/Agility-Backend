const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUser,
  getUsers,
  updateUser,
  deleteUser,
} = require("../controllers/userController");
const protect = require("../middleware/authMiddleware");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/all", getUsers);
// router.route("/", protect).get(getUser).put(updateUser).delete(deleteUser);
router.get("/", protect, getUser);
router.put("/", protect, updateUser);
router.delete("/", protect, deleteUser);

module.exports = router;

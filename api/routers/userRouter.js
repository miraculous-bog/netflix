const express = require('express');
const router = express.Router();
const { updateUser, deleteUser, getUserById, getAllUsers, getUserStats, addListItem, deleteListItem } = require('../controllers/userController');
const checkAuth = require('../checkAuth');

router.put("/:id", checkAuth, updateUser);
router.delete("/:id", checkAuth, deleteUser);
router.get("/find/:id", getUserById);
router.get("/", checkAuth, getAllUsers);
router.get("/stats", getUserStats);
router.post("/list/:id", checkAuth, addListItem);
router.delete("/list/:id", checkAuth, deleteListItem);

module.exports = router;
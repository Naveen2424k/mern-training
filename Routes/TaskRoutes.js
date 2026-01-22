const express = require("express");
const router = express.Router();


const { createTask, getTasks, updateTask, deleteTask, TaskById } = require("../controllers/TaskController");

const { protect } = require('../middleware/authmidlle')

router.post("/create", protect, createTask);
router.get('/getTask/:id', protect, TaskById);
router.get("/get", protect, getTasks);

router.put("/update/:id", protect, updateTask);

router.delete("/delete/:id", protect, deleteTask);




module.exports = router;
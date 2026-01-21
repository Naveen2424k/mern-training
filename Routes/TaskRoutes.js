const express=require("express");
const router=express.Router();


const {createTask,getTasks,updateTask,deleteTask}=require("../controllers/TaskController");
router.post("/create",createTask);
router.get("/get",getTasks);
router.put("/update/:id",updateTask);
router.put("/delete/:id",deleteTask);
module.exports=router;
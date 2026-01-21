const Task=require("../models/Task");
exports.createTask=async(req,res)=>{
    try { 
        const {title,description,status,user}=req.body;
        const task=new Task({title,description,status,user});
        await task.save();
        res.status(201).json({message:"task created successfully",user});
    } catch (error) {
        res.status(500).json({message:"Internal server error"});
    }
}
exports.getTasks=async(req,res)=>{
    try { 
        const tasks=await Task.find();
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({message:"Internal server error"});
    }
}

exports.updateTask=async(req,res)=>{
    try {
        const {title,description,status}=req.body;
        const task=await Task.findByIdAndUpdate(req.params.id,{title,description,status});
        res.status(200).json({message:"task updated successfully"});
    } catch (error) {
        res.status(500).json({message:"Internal server error"});
    }
}
exports.deleteTask=async(req,res)=>{
    try {
        const task=await Task.findByIdAndDelete(req.params.id);
        res.status(200).json({message:"task deleted successfully"});
    } catch (error) {
        res.status(500).json({message:"Internal server error"});
    }
}
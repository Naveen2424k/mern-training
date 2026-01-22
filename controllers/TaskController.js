const Task = require("../models/Task");
exports.createTask = async (req, res) => {
    try {
        const { title, description, status } = req.body;
        const task = new Task({ title, description, status, user: req.user.id });
        await task.save();
        res.status(201).json({ message: "task created successfully", task });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}
exports.getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.user.id });
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}

exports.updateTask = async (req, res) => {
    try {
        const { title, description, status } = req.body;
        const task = await Task.findOneAndUpdate({ _id: req.params.id, user: req.user.id }, { title, description, status }, { new: true });
        if (!task) return res.status(404).json({ message: "task not found or not authorized" });
        res.status(200).json({ message: "task updated successfully", task });
    } catch (error) { 
        res.status(500).json({ message: "Internal server error" ,msg:"hi"});
    } 
}
exports.deleteTask = async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.user.id });
        if (!task) return res.status(404).json({ message: "task not found or not authorized" });
        res.status(200).json({ message: "task deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}
exports.TaskById = async (req, res) => {
    try {
        const task = await Task.findOne({ _id: req.params.id, user: req.user.id })
        if (!task) {
            return res.status(404).json({ message: "task not found" });
        }
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}

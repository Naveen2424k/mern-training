const mongoose=require("mongoose");
const TaskSchema=mongoose.Schema({
    title:String,
    description:String,
    status:String,
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Users"
    }
})
module.exports=mongoose.model("Tasks",TaskSchema);
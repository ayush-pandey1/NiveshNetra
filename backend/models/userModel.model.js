const mongoose =require("mongoose");

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        min:3,
        max:20,
        unique:true
    },
    email:{
        type:String,
        rquired:true,
        unique:true,
        max:50,
    },
    password:{
        type:String,
        required:true,
        min:8,

    },
    online:{
        type:Boolean,
        default:false
    },
    
    
}, {timestamps: true})

module.exports = mongoose.model("Users",userSchema);
const mongoose = require('mongoose');

const contactSchema = mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:[true,"User id is required"],
        ref:"User"
    },
    name:{
        type:String,
        required:[true,"Name is required"],
    },
    email:{
        type:String,
        required:[true,"Email is required"],
    },
    phno:{
        type:String,
        required:[true,"Phno is required"],
    }
},{
    timestamps:true
});

module.exports = mongoose.model("Contact",contactSchema);
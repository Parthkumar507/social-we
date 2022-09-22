const mongoose=require('mongoose');

const commentSchema= new mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    post:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Post'
    },
    //comment belongs to user
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }

},{
    timestamps:true
})
const Comment=mongoose.model('Comment',commentSchema);
module.exports=Comment







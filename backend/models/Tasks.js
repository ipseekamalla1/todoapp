const { default: mongoose } = require('mongoose');
const connectToMongo=require('mongoose')

const TasksSchema = new connectToMongo.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'

    },

   taskName:{
        type:String,
        required:true
    },

    dateAdded:{
        type:Date,
        default:Date.now
    },
    status:{
        type:Date,
        default: "Todo"
    }
    

});

module.exports=mongoose.model('tasks',TasksSchema)

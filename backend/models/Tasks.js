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
    status:{
        type: String,
        enum: ['To Do', 'In Progress','Completed'],
    },
    dateAdded:{
        type:Date,
        default:Date.now
    }
    
    

});

module.exports=mongoose.model('tasks',TasksSchema)

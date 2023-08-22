const mongoose=require('mongoose');

const mongoURI='mongodb://mongodb://127.0.0.1:27017/todo'

const connectToMongo=()=>{
    mongoose.connect(mongoURI);
    console.log("Connected to Mongo Sucessfully for the todo app");
}

module.exports=connectToMongo
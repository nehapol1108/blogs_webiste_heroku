const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const blogSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    snippet:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true
    }
},{timestamps:true});  //it is option object here timestamp will automatically come

const Blog = mongoose.model('Blog',blogSchema)  //here a Blog is collection name
 //second argument is schema what type of object we are gonna store
module.exports = Blog;
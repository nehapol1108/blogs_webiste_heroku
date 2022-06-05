const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
// const blog = require('./models/blog');
const blogRoutes = require('./routes/blogRoutes');
const Blog = require('./models/blogs');
const { render } = require('ejs');
//set up express app
const app = express();
const port = process.env.PORT || 3000;
//connect to mongodb
const dbURI= "mongodb+srv://netninja:test1234@mongotuts.mlcev.mongodb.net/mongotuts?retryWrites=true&w=majority";
mongoose.connect(dbURI,{useNewUrlParser:true,useUnifiedTopology:true})
.then((result)=>app.listen(port))
.catch((err)=>console.log(err));
 
//register view engines
app.set('view engine','ejs');
// app.set('views','myviews');  //in case u have kept files in file with other name
                            //then just give the name in the second argument

//listen for requests
// mongodb+srv://neha40:<password>@mongotuts.mlcev.mongodb.net/test

app.use(express.static('public'));  //give folder name
app.use(morgan('dev'));
app.use(express.urlencoded({extended:true}));
app.use((req, res, next) => {
   res.locals.path = req.path;
   next();
 });
// app.use((req, res,next) => {
//    console.log('new request made:');
//    console.log('host: ', req.hostname); 
//    console.log('path: ', req.path);
//    console.log('method: ', req.method);
//    next();  //we write this to move on after running this function or else it will get lost
//  });
//  app.use((req, res,next) => {
//    console.log('in the next middleware');
//    next();  
//  });

// app.get('/add-blog',(req,res)=>{  //how to save all the blogs in the database
//     const blog = new Blog({
//        title:"new Blog 2",
//        snippet:"about my new blog",
//        body:"more about my new blog"
//     });
//     blog.save()
//     .then((result)=>{
//       res.send(result)
//     })
//     .catch((err)=>{
//       console.log(err)
//     })
// })

// app.get('/add-blogs',(req,res)=>{  //getting all blogs from database
//    Blog.find()
//    .then((result)=>{
//       res.send(result);
//    })
//    .catch((err)=>{
//       console.log(err)
//     })
// })

// app.get('/single-blog',(req,res)=>{   //get a particular data
//    Blog.findById('62764e3258049df45318b230')
//    .then((result)=>{
//       res.send(result);
//    })
//    .catch((err)=>{
//       console.log(err)
//     })
// })

// //routes
// app.get('/',(req,res)=>{
//     res.redirect('blogs');
//    })
// // app.use((req, res,next) => {
// //    console.log('in the next middleware');
// //    next();  
// //  });  -->if u write this after home page then it will not run for home page bcoz the response was already sent in home page

// app.get('/about',(req,res)=>{
//    res.render('about',{title:'About'});
// });


// //blog routes
// app.get('/blogs',(req,res)=>{
//    Blog.find().sort({createdAt:-1})  //it sorts in such a way that new blog comes up
//    .then((result)=>{
//       res.render('index',{title:'All Blogs',blogs:result})
//    })
//    .catch((err)=>{
//       console.log(err)
//     })
   
// })


// //post request
// app.post('/blogs',(req,res)=>{
//    // console.log(req.body);
//    const blog = new Blog(req.body);
//    blog.save()
//      .then((result)=>{
//          res.redirect('/blogs');
//      })
//      .catch((err)=>{
//       console.log(err)
//     })
// })
// app.get('/blogs/:id',(req,res)=>{
//    const id = req.params.id;
//    // console.log(id);
//    Blog.findById(id)
//     .then((result)=>{
//        res.render('details',{blog:result,title:'Blog Details'});
//     })
//     .catch((err)=>{
//       console.log(err)
//     })

// })
// app.delete('/blogs/:id',(req,res)=>{
//    const id = req.params.id;
//    // console.log(id);
//    Blog.findById(id)
//     .then((result)=>{
//        res.render('details',{blog:result,title:'Blog Details'});
//     })
//     .catch((err)=>{
//       console.log(err)
//     })
// })
// app.get('/blogs/create',(req,res)=>{
//     res.render('create',{title:'Create a new blog'});
//  });


// //redirects
// app.get('/about-us',(req,res)=>{
//     res.redirect('/about'); //it automatically set the status code

// });

// // 404 page
// app.use((req,res)=>{  //use function is used to create middleware and fire middleware functions in express
//    res.status(404).render('404',{title:'404'});
// })
//use() is a function that takes another function (callback) as a parameter and runs every time, when the request is sent to the express app/server. 
//it should be written at the last



// middleware
// code which runs (on the server) between getting a request and sendind a response
// middleware runs from top to bottom and it runs that way we exit the process or explicitly send a response to the browser
 
// middleware examples
// logger middleware to log details of every request
// authentication check middleware for protected routes
// middleware to parse json data from requests
// return 404 pages

// morgan->third party middleware
// npm install morgan

// static middleware
// static() function is a built-in middleware function in Express. It serves static files and is based on serve-static. 
// Syntax: express.static(root, [options])
// Parameters: The root parameter describes the root directory from which to serve static assets. Return Value: It returns an Object.


//request types
//get requests to get a resource
//post requests to create new data(eg: a new blog)
//delete requests to delete data(eg: delete a blog)
//put requests to update data(eg: update a blog)

// eg: localhost:3000/blogs  get 
// eg: localhost:3000/blogs/create  get 
// eg: localhost:3000/blogs  post
// eg: localhost:3000/blogs/:id  get
// eg: localhost:3000/blogs/:id  delete  
// eg: localhost:3000/blogs/:id  put 


//route parameters
//the variable parts of the route that may change
// eg: localhost:3000/blogs/:id  here id is route paramter

app.get('/', (req, res) => {
   res.redirect('/blogs');
 });
 
 app.get('/about', (req, res) => {
   res.render('about', { title: 'About' });
 });
 
 // blog routes
 app.use('/blogs',blogRoutes);
 // 404 page
 app.use((req, res) => {
   res.status(404).render('404', { title: '404' });
 });
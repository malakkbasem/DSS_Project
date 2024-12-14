const express = require('express');
const mongoose = require('mongoose');
let app = express();
app.use(express.json());


//connection with local DB
async function connectToLocalDatabase() {
    try {
      await mongoose.connect('mongodb://0.0.0.0:27017/', {
        
      });
      console.log('Connected to MongoDB!');
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
    }
  }
  
  connectToLocalDatabase();

//Schema
const userSchema=new mongoose.Schema({
    name: String,
    email:String,
    username: String,
    password: String,
    age:Number,
    phone:String,
    Nationality: String
})

const blogSchema=new mongoose.Schema({
    authorId: Number,
    title: String,
    content:String,
    createdDate:Date
})

const hotelRatingSchema=new mongoose.Schema({
    name:String,
    rating:Number,
    country:String,
    comments:String
})



//convert schema to model (class)
let userModel = mongoose.model("users",userSchema);
let blogModel = mongoose.model("blogs",blogSchema);
let ratingModel = mongoose.model("hotelRatings",hotelRatingSchema);


//Inserting data
let newUser = new userModel({
    name: "Maria Garcia",
    email: "maria.garcia@example.com",
    username: "mariag22",
    password: "hashedpassword456",
    age: 28,
    phone: "+34123456789",
    nationality: "Spanish"
}).save();

let newBlog = new blogModel({
    authorId: 12,
    title: "My experience in Paris",
    content:"My trip to Paris was nothing short of magical!",
    createdDate:"2024/12/14"
}).save();

let newRating = new ratingModel({
    name: "Grand Paris Hotel", 
    rating: 4.7,               
    country: "France",         
    comments: "Wonderful experience! The staff was friendly, and the rooms were spacious and clean." 
}).save();


//get all users
app.get('/users',async(req,res)=>{
  let allUsers= await userModel.find();
  res.status(200);
  res.json(allUsers)
})

app.get('/blogs',async(req,res)=>{
  let allBlogs= await blogModel.find();
  res.status(200);
  res.json(allBlogs)
})

app.get('/hotelRatings',async(req,res)=>{
  let allRatings= await ratingModel.find();
  res.status(200);
  res.json(allRatings)
})



//post
app.post('/users',async(req,res)=>{
    let newUser = await userModel({
     name: "John Doe",
     email: "johndoe@example.com",
     username: "johnnyd123",
     password: "hashedpassword123",
     age: 30,
     phone: "+1234567890",
     Nationality: "American"
    }).save()

    res.status(201);
    res.json('User is created')
})

app.post('/blogs',async(req,res)=>{
    let newBlog = await blogModel({
        title: "My Guide to the Best Beaches in Hawaii",
        content: "Hawaii offers some of the most stunning beaches in the world. This guide will take you through the best spots to visit on each island.",
        createdDate: "2024-12-15T12:30:00Z"
    }).save()

    res.status(201);
    res.json('Blog is published')
})

app.post('/hotelRatings',async(req,res)=>{
    let newBlog = await ratingModel({
        name: "Mountain View Lodge",
        rating: 5.0,
        country: "Switzerland",
        comments: "Perfect getaway! Stunning views, cozy rooms, and exceptional service."
    }).save()

    res.status(201);
    res.json('Rating is saved')
})
 


//delete
app.delete('/users/:id', async(req,res)=>{
    let userId = req.params.id;
    let result = await userModel.findByIdAndDelete(userId);

    if(!result){
        res.status(404);
        res.json('User is not found')
    }
    res.status(200);
    res.json('User deleted successfully');
})

app.delete('/blogs/:id', async(req,res)=>{
    let blogId = req.params.id;
    let result = await blogModel.findByIdAndDelete(blogId);

    if(!result){
        res.status(404);
        res.json('Blog is not found')
    }
    res.status(200);
    res.json('Blog deleted successfully');
})

app.delete('/hotelRatings/:id', async(req,res)=>{
    let ratingId = req.params.id;
    let result = await ratingModel.findByIdAndDelete(ratingId);

    if(!result){
        res.status(404);
        res.json('Rating is not found')
    }
    res.status(200);
    res.json('Rating deleted successfully');
})


// app.put('/users/:id', async (req, res) => {
//     try {
//         // Extract the dynamic user ID from the route parameters
//         const userId = req.params.id;

//         // Validate the ID format
//         if (!mongoose.Types.ObjectId.isValid(userId)) {
//             return res.status(400).json({ message: 'Invalid user ID format' });
//         }

//         // Extract the updated fields from the request body
//         const updates = req.body;

//         // Find the user by the dynamic ID and update their details
//         const updatedUser = await userModel.findByIdAndUpdate(userId, updates, {
//             new: true, // Return the updated document
//             runValidators: true, // Ensure validation rules are enforced
//         });

//         if (!updatedUser) {
//             return res.status(404).json({ message: 'User not found' });
//         }

//         res.status(200).json({ message: 'User updated successfully', user: updatedUser });
//     } catch (error) {
//         res.status(500).json({ message: 'Error updating user', error });
//     }
// });

// app.put('users/:id',async(req,res)=>{
//     let userId = req.params.id;
//     let user = await userModel.findById(userId);
//     let updatedUser = await userModel.findByIdAndUpdate(userId,{
//         name : "Ahmed",
//         age:22
//     },{
//         new: true, // Return the updated document
//         runValidators: true, // Ensure validation rules are enforced
//     });

//     if(!user){
//         res.status(404);
//         res.json('User not found')
//     }
//     res.status(200);
//     res.json(updatedUser);
// });

app.put('/users/:id', async (req, res) => {
    try {
        const userId = req.params.id;

        // Validate the ID format
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: 'Invalid user ID format' });
        }

        // Perform the update using findByIdAndUpdate
        const updatedUser = await userModel.findByIdAndUpdate(
            userId,
            {
                name: "Ahmed",  // Example fields for update
                age: 22,
            },
            {
                new: true, // Return the updated document
                runValidators: true, // Ensure validation rules are enforced
            }
        );

        if (!updatedUser) {
            // If no user was found and updated
            return res.status(404).json({ message: 'User not found' });
        }

        // Return the updated user
        res.status(200).json(updatedUser);
    } catch (error) {
        // Handle unexpected errors
        res.status(500).json({ message: 'Error updating user', error });
    }
});



// get one user
app.get('/users/:id', async(req,res)=>{
    let userId = req.params.id;
    let user = await userModel.findById(userId);

    if(!user){
        res.status(404);
        res.json('User not found')
    }
    res.status(200);
    res.json(user);

})

app.get('/blogs/:id', async(req,res)=>{
    let blogId = req.params.id;
    let blog = await blogModel.findById(blogId);

    if(!blog){
        res.status(404);
        res.json('Blog is not found')
    }
    res.status(200);
    res.json(user);

})

app.get('/hotelRatings/:id', async(req,res)=>{
    let ratingId = req.params.id;
    let rating = await ratingModel.findById(ratingId);

    if(!rating){
        res.status(404);
        res.json('Rating is not found')
    }
    res.status(200);
    res.json(user);

})


// app.put('users/:id', async(req,res)=>{
//     let userId = req.params.id;
//     let result = await userModel.findByIdAndUpdate(userId);

//     if(!result){
//         res.status(404);
//         res.json('User not found')
//     }
//     res.status(200);
//     res.json('User updated successfully');
// })

//connection to a server
app.listen(3000,function(){
    console.log('Server is opened')
})



const express = require('express');
const mongoose = require('mongoose');
let app = express();




const uri='connection string'


//connection with DB
// async function connectToDatabase() {
//     try {
//       await mongoose.connect(uri, {
        
//       });
//       console.log('Connected to MongoDB!');
//     } catch (error) {
//       console.error('Error connecting to MongoDB:', error);
//     }
//   }
  
//   connectToDatabase();

//connect with data base in mongoAtlas 
let coonectDB = async function(){

    await mongoose.connect(' mongodb+srv://malakkbassem27:q8BAglfyom6vudwS@dssproject.iefg5.mongodb.net/?retryWrites=true&w=majority&appName=DSSProject ',{
        
    })
    
}
coonectDB(); 






//connection to a server
app.listen(3000,function(){
    console.log('Server is opened')
})



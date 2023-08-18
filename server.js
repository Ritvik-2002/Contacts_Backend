const express = require('express');
const errorhandler = require('./middleware/errorHalder');
const connectDB = require('./config/dbconnection');
const dotenv = require('dotenv').config();
const app = express();
const port = process.env.PORT||5000;
// app.get('/',(req,res)=>{
//     res.json({message:"Hello World"});
// });

connectDB();
app.use(express.json()) //This is like body parser.
app.use("/api/contacts",require("./Routes/contactRoute"));
app.use("/api/users",require("./Routes/userRoute"));
app.use(errorhandler);
app.listen(port,()=>{
    console.log(`app running on port ${port}`);
});
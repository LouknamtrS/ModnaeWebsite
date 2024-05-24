
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();
const bodyParser = require("body-parser")
const {readdirSync, readvSync} = require("fs")
const fs = require('fs');
const path = require('path');
const app = express();
const Topic = require('./routes/topicRoute');
const WriteReview = require('./routes/writeReviewRoute')
const ReadReview = require('./routes/readReviewRoute')
const Search = require('./routes/searchReviewRoute')
const Api = require('./routes/api')
app.use(express.json());

const corsOptions ={
    origin:'http://localhost:5173', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));

//middleware
app.use(morgan("dev"))


app.get('/',(req,res)=>{
  res.send("hi")
})
//Route

app.use("/",Topic)
app.use("/",WriteReview)
app.use("/",ReadReview)
app.use("/",Search)

readdirSync("./routes").map((r)=>app.use("/api",require("./routes/"+r)))



mongoose.connect(
 "mongodb+srv://modnoy:modnaetuanoy@modnae.olhb5sg.mongodb.net/modnaeDB"
);

const connection = mongoose.connection;
connection.once("open", () => {
    console.log("MongoDB database connected.");
});


app.listen(5000, () => {
  console.log(`Server is running`);
});

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");
require("dotenv").config({
  path: process.env.NODE_ENV === "production"
    ? path.resolve(__dirname, ".env")
    : path.resolve(__dirname, ".env.local")
});
const bodyParser = require("body-parser")
const {readdirSync, readvSync} = require("fs")
const fs = require('fs');
const app = express();
const Topic = require('./routes/topicRoute');
const WriteReview = require('./routes/writeReviewRoute')
const ReadReview = require('./routes/readReviewRoute')
const Search = require('./routes/searchReviewRoute')
const Api = require('./routes/api')
app.use(express.json());

const allowedOrigins = [process.env.FRONTEND_URL];
const options = {
    origin: allowedOrigins,
    credentials:true,            //access-control-allow-credentials:true
    // optionSuccessStatus:200
};

app.use(cors(options))

//middleware
app.use(morgan("dev"))


app.get('/',(req,res)=>{
  res.send("hi")
})
app.get('/api/data',(req,res)=>{
  res.json({message:'hello from backend'});
});
app.use("/",Topic)
app.use("/",WriteReview)
app.use("/",ReadReview)
app.use("/",Search)

readdirSync("./routes").map((r)=>app.use("/api",require("./routes/"+r)))

mongoose.connect(
  process.env.MONGODB,
)
.then(() => {
  console.log("MongoDB connected");
  app.listen(process.env.PORT || 3000, () => {
    console.log(`Server running on port ${process.env.PORT || 3000}`);
  });
})
.catch((err) => {
  console.error("MongoDB connection error:", err);
});
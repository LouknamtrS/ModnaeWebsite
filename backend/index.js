
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();
const bodyParser = require("body-parser")
const {readdirSync, readvSync} = require("fs")
const app = express();
const Topic = require('./routes/topicRoute');
const WriteReview = require('./routes/writeReviewRoute')
const ReadReview = require('./routes/readReviewRoute')
const Search = require('./routes/searchReviewRoute')
app.use(express.json());
app.use(
  cors({
    origin: ["https://modnae-website.vercel.app"],
    methods: ["GET", "POST"],
    credentials: true,
    
  })
);

//middleware
app.use(morgan("dev"))
app.use(bodyParser.json({limit:"20mb"}))


//Route

app.use("/",Topic)
app.use("/",WriteReview)
app.use("/",ReadReview)
app.use("/",Search)
readdirSync("./routes").map((r)=>app.use("/api",require("./routes/"+r)))

app.get("/",(req,res)=>{res.json("hello")})


mongoose.connect(
 "mongodb+srv://modnoy:modnaetuanoy@modnae.olhb5sg.mongodb.net/?retryWrites=true&w=majority&appName=Modnae"
);

const connection = mongoose.connection;
connection.once("open", () => {
    console.log("MongoDB database connected.");
});


app.listen(5000, () => {
  console.log(`Server is running`);
});

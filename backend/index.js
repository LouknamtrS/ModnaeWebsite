
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
const corsOptions = {
  origin: 'https://modnae-website.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));

//middleware
app.use(morgan("dev"))
app.use(bodyParser.json({limit:"20mb"}))


//Route

app.use("/",Topic)
app.use("/",WriteReview)
app.use("/",ReadReview)
app.use("/",Search)
// app.use("/api/",Api)
// // readdirSync("./routes").map((r)=>app.use("/api",require("./routes/"+r)))
fs.readdirSync("./routes").forEach((file) => {
  const route = require(path.join(__dirname, 'routes', file));
  app.use("/", route);
});


mongoose.connect(
 "mongodb+srv://modnoy:modnaetuanoy@modnae.olhb5sg.mongodb.net/?retryWrites=true&w=majority&appName=Modnae?directConnection=true"
);

const connection = mongoose.connection;
connection.once("open", () => {
    console.log("MongoDB database connected.");
});


app.listen(5000, () => {
  console.log(`Server is running`);
});

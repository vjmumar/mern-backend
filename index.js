const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const mongoose = require("mongoose");
const USER_ROUTE = require("./src/routes/User");
const cors = require("cors");
require('dotenv').config();

//cors
app.use(cors());
//parse Json
app.use(express.json());

//routes
app.use("/", USER_ROUTE);

//Function To Connect To MongoDb
const connectToDb = () => {
const DB_URL = process.env.MONGO_DB;
const DB_SETTINGS = {
useNewUrlParser: true,
useUnifiedTopology: true,
useFindAndModify: false
}
mongoose.connect(DB_URL, DB_SETTINGS)
.then(() => console.log("Connected To DB"))
.catch(err => err&& console.log("Cannot Connect To DB"));    
}


//Start The Server
app.listen(PORT, () => {
console.log(`Listening on Port ${PORT}`);
connectToDb();
})
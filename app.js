const express = require('express')
const app = express()
const mongoose = require("mongoose")
const extfileupload = require('express-fileupload')
require("dotenv").config();
const path = require('path')
const cookieparser = require('cookie-parser')
const cors = require('cors')
const authroute = require('./routes/authroutes')

//connect to mongodb
const url = process.env.MONGO_URI;
mongoose.connect(url)
  .then(() => {
    console.log("connected to mongoDB");
  })
  .catch((err) => {
    console.log("error connecting " + err.message);
  });

 //middlewares
 app.use("/public", express.static(path.join(__dirname, "public")))
 app.use(express.urlencoded({ extended: true}))
 app.use(extfileupload())
 app.use(cookieparser())
 app.use(express.json())
app.use(
  cors({
    origin: [
      "http://localhost:5173", // for local dev (Vite)
      "https://xzellentweb.vercel.app", // your deployed frontend
      "https://yourcustomdomain.com" // if you have a custom domain later
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use("/api/v1", authroute)

app.get("/", (req, res) =>{
  console.log(`${req.method} ${req.url} ${req.hostname}`)
  res.status(200).json({message:`welcome to ${req.protocol}://${req.get("host")} API`, status: "success"})
})


const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});


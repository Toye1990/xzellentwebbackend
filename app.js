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
app.use(cors({
  //origin: "http://localhost:5173",  // your frontend URL
  origin: "https://www.xzellentsolutions.com.ng",  // your frontend URL
  //origin: "https://xzellentsite.vercel.app",  // your frontend URL
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use("/api/v1", authroute)

app.get("/", (req, res) =>{
  console.log(`${req.method} ${req.url} ${req.hostname}`)
  res.status(200).json({message:`welcome to ${req.protocol}://${req.get("host")} API`, status: "success"})
})
/*
// ===== Serve React (Vite / dist) =====
const reactPath = path.join(__dirname, "client", "dist");

app.use(express.static(reactPath));

app.get("/*", (req, res) => {
  res.sendFile(path.join(reactPath, "index.html"));
});*/


const port = process.env.PORT || 9001;

app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});




/*
const express = require('express');
const app = express();
const mongoose = require("mongoose");
const fileUpload = require('express-fileupload');
require("dotenv").config();
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const authroute = require('./routes/authroutes');

// ================= MongoDB =================
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.log("Mongo error:", err.message));

// ================= Middlewares =================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());
app.use(cookieParser());

app.use(cors({
  origin: [
    "https://xzellentsite.vercel.app"
  ],
  credentials: true
}));

// ================= API ROUTES (FIRST) =================
app.use("/api/v1", authroute);

// ================= SERVE REACT (ONLY ONE WAY) =================
// If using Vite
const reactPath = path.join(__dirname, "client", "dist");
// If CRA → change to: client/build

app.use(express.static(reactPath));

// React fallback (LAST)
app.get("*", (req, res) => {
  res.sendFile(path.join(reactPath, "index.html"));
});

// ================= START SERVER =================
app.listen(process.env.PORT, () => {
  console.log("Server running");
});
*/
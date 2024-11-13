const express = require("express");
const app = express();
const env = require("dotenv");
env.config();
const PORT = process.env.PORT || 3000;
const mongoose = require("mongoose");
const MONGO_URI = process.env.MONGO_URI;
const userRoutes = require("./routes/user");
const jobRoutes = require("./routes/job")



app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get("/", (req, res) => {
  res.send("hi im from the backend");
});


app.use("/api/user", userRoutes);
app.use("/api/job", jobRoutes)
app.listen(PORT, () => {
  console.log(`Server is running on the port: ${PORT}`);
  mongoose.connect(MONGO_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(()=>{
    console.log("Connected to MongoDB");
  }).catch((err)=>{
    console.log(err);
  });
});

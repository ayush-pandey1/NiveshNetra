const express=require("express");
const cors = require("cors");
const mongoose =require("mongoose");
const userRoutes =require("./routes/userRoutes.routes.js")
const userWatchlistRoutes = require("./routes/userWatchlistRoutes.routes.js")
const searchRoutes = require("./routes/searchRoutes.routes.js")

const app = express();
require("dotenv").config();

app.use(cors({
    origin: ["https://nivesh-netra.vercel.app",
             "https://nivesh-netra.vercel.app/api/auth/signUp"
             "https://nivesh-netra.vercel.app/api/auth/login",
             "https://nivesh-netra.vercel.app/api/auth/logout",
             "https://nivesh-netra.vercel.app/api/watchlist",
             "https://nivesh-netra.vercel.app/api/watchlist/retrieve",
             "https://nivesh-netra.vercel.app/api/watchlist/retrieve",
             "https://nivesh-netra.vercel.app/api/watchlist/delete",
             "https://nivesh-netra.vercel.app/api/search/intraday"],
    methods: ["POST", "GET"],
    credentials: true
  }));
app.use(express.json());
app.use("/api/auth",userRoutes);
app.use("/api/watchlist",userWatchlistRoutes);
app.use("/api/search",searchRoutes);

mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("DB Connection successful");
})
.catch((error)=>{
    console.log(error.message);
})

const server= app.listen(process.env.PORT,() => {
    console.log(`Server is successfully runing on port ${process.env.PORT}`);
    
});

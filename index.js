import express from "express";
import mongoose from "mongoose"; 
import cors from "cors";

import router from "./Routes/user-routes.js";
import blogRouter from "./Routes/blog-routes.js";

const App = express();
App.use(express.json());
App.use(cors());


//routes
App.use("/api/user", router);
App.use("/api/blog", blogRouter);


mongoose.connect(
    "mongodb+srv://sachin:ZIaIo9xfzwMX8x8y@cluster0.q5hckj5.mongodb.net/?retryWrites=true&w=majority")
    .then(() => 
        App.listen(4000)
    )
    .then(() => 
        console.log("Database connected and listening at port 4000!!!!!!")
    )
    .catch((err) => 
        console.log("err database connection failed!!!!!")
    );

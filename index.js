require("dotenv").config();
require("./config/ds");
const cors = require("cors");

const express = require("express");
const PORT = process.env.PORT || 3030;
const server = express();


//external middlewares
server.use(cors());

//middlewares
server.use(express.static("public"));
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

//routing
server.use("/api/users", require("./users/usersRt"));

//posts
server.use("/api/posts", require("./posts/postsRt"));

server.listen(PORT, (err)=> {
    !err ?
    console.log("Server Ok")
    :
    console.log("Server down");
});

//404
server.use((req, res, next) => {
    console.log("404 handler");
    let error = new Error();
    error.message = "Resource Not Found";
    error.status = 404;
    next(error);
  });
  
  //general error handler
  server.use((error, req, res, next) => {
    if (!error.status) error.status = 400;
    res
      .status(error.status)
      .json({ status: error.status, message: error.message });
  });


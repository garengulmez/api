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



server.listen(PORT, (err)=> {
    !err ?
    console.log("Server Ok")
    :
    console.log("Server down");
});
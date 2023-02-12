const express = require("express");

const tarifRouter = require("./tarifler/tarifler-router")


const server = express();

server.use(express.json())

server.use("/api/tarifler", tarifRouter);

server.use(("*", (req,res) => {
    res.status(404).json({
        message: "Not Found"
    })
}))

module.exports = server;
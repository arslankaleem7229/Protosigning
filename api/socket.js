const Express = require("express")()
const express = require("express");
const Http = require('http').Server(Express)
const cors = require("cors");
const bodyParser = require('body-parser')
const app = express()
const Socketio = require("socket.io")(Http)


var workspace = 0

Socketio.on("connection", socket => {
    // console.log("new connection made")
    console.log(`Socket ${socket.id} connected. ${Socketio.engine.clientsCount}`);
    // socket.on('disconnect', () => {
    //     console.log(`Socket ${socket.id} disconnected.`);
    // });

    socket.emit("workspace", workspace)
    socket.on("workspace", data => {
        socket.broadcast.emit("workspace", data)
    })
    socket.on("editing", data => {
        // console.log('currentltarasda')
        socket.broadcast.emit('editing', data)
    })
})
app.use(bodyParser.json())
app.use(cors())
app.use('/', (req, res) => {
    res.send("Hello")
});

Http.listen(process.env.PORT || 9091, () => {
    console.log('listening at :9091...')
})

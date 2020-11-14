var app = require('express')(); // Express frameork 
var http = require('http').createServer(app);
var io = require('socket.io')(http); // Socket io server

app.get('/', (req, res) => { //If user sends get req to url
    res.sendFile(__dirname + '/server.html'); // send user this file
});

io.on('connection', (socket) => { //listening for diff events 
    console.log('a user connected');
});

http.listen(3000, () => {
    console.log('listening on *:3000');
});
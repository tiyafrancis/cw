const express = require('express'); // Express frameork 
const path = require('path');
const http = require('http');
const PORT = process.env.PORT || 3000;
const socketio = require('socket.io'); // Socket io server
/* const mysql = require('mysql');
const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'MYGAME!1database',
  database: 'pacman'
});

con.connect((err) => {
  if(err) throw err;
  console.log('Connection established');
}); */
/*
con.query('SELECT * FROM scoreboard', (err,rows) => {
    if(err) throw err;

    console.log('Data received from Db:');
    console.log(rows);
});
*/


const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.static(path.join(__dirname, "client"))); //Serving static folder to the client


server.listen(3000, () => { // Listening on port 
    console.log('listening on port:3000');
});
var playerNames = {};
const connections = []; // 5 players in each game 
var playerStatus = {}; //Players score, location
var playerStatus_console = {}



io.on('connection', socket => { //On user connection
    socket.on('userName', name => {
        socket.id = name;
        /* con.query(`INSERT INTO scoreboard (player) VALUES ('${name}')`, function(err,result) {
            if (err) throw err;
            console.log("1 record inserted");
        }); */
        console.log(`yay!! ${name} just connected!`);
    })

    socket.on('disconnect', data => {
        console.log(`aww ${socket.id} just left`);
        playerStatus = {}
    })

    socket.on('player-joined', () => {
        connections.push(socket.id);
        socket.emit('player-joined-notification', { playerNumber: connections.indexOf(socket.id) })
    })

    socket.on('playerPosition', data => {
        playerStatus_console[socket.id] = (data.playerPosition);
        playerStatus[socket.id] = (data.playerPosition + "<div id='headerpicture'></div>");
        console.log(playerStatus_console);
        var playerStatusString = JSON.stringify(playerStatus);

        playerStatusString = playerStatusString.replace(/[{","​​​​​}​​​​​]/g, '');
        socket.emit('scores', playerStatusString);

    })

    socket.on('playerScore', data => {
        playerStatus[socket.id] = (data.playerScore);
        console.log(playerStatus);
    })

    socket.on('gameover', data => {
        socket.broadcast.emit('gameover2', data);
    })

    setInterval(() => { // Refreshing wvery 2 milliseconds 
        socket.emit('updateScores', playerStatus);
    }, 300)

});
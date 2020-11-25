const express = require('express'); // Express frameork 
const path = require('path');
const http = require('http');
//const PORT = process.env.PORT || 3000  
const socketio = require('socket.io'); // Socket io server
var mysql = require('mysql'); // using mysql module

// connect to db
var con = mysql.createConnection({
    host: "localhost",
    user: "root",    
    password: "<password>", // enter password of mysql db
    database: "pacman"
}); 

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

// not sure about the positioning of the below query
con.connect(function(err) {
    if (err) 
        console.log("Can not connect to db!");
    else
    {
        console.log("Connected!");
        con.query("CREATE DATABASE pacman", function (err, result) {
            if (err) throw err;
            console.log("Database created");
        });
        var sql = "CREATE TABLE scoreboard (players VARCHAR(255), score int)";
        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log("Table created");
        });
       
    }
        
});

io.on('connection', socket => { //On user connection
    
    /*  var playerNumber = -1;
    for (var i in numberOfConnections) { //Iterating through the array
        if (numberOfConnections[i] == null) {
            playerNumber = i; //Setting player number to the number of the element of null
            break; //breaking the statement so it isn't repeated over and over again
        }
    }
*/
    socket.on('userName', name => {
        socket.id = name;
        console.log(`yay!! ${name} just connected!`);
    })

    socket.on('disconnect', data => {
        // not sure about the positioning of the below query
        // the idea is: on disconnection, 
        // store the player name and score so it can accessed later
        
        /* con.query((`INSERT INTO customers (name, address) VALUES (${socket.id}, ${data.playerScore})`), function (err, result) {
            if (err) throw err;
            console.log("1 record inserted");
          }); */

        console.log(`aww ${socket.id} just left`);
    })

    socket.on('player-joined', () => {
        connections.push(socket.id);
        socket.emit('player-joined-notification', { playerNumber: connections.indexOf(socket.id) })
    })

    socket.on('playerPosition', data => {
        playerStatus[socket.id] = (data.playerPosition);
        // console.log(playerStatus);
        var myJSON = JSON.stringify(playerStatus);
        socket.emit('scores', myJSON);
        console.log(myJSON);
    })

    socket.on('playerScore', data => {
        playerStatus[socket.id] = (data.playerScore);
        console.log(playerStatus);
    })

    // TODO: setInterval function 

    setInterval(() => { // Refreshing wvery 2 milliseconds 
        socket.emit('updateScores', playerStatus);
    }, 300)

    /*
    socket.emit('player-number', playerNumber); //Telling the user what player they are
    console.log(`Player ${playerNumber} has joined`);

    connections[playerNumber] = false;

    */

    //Ignoring additional players 

    // if (playerNumber == 6) {
    //     return;
    // }
    
});


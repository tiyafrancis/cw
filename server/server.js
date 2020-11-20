const express = require('express'); // Express frameork 
const path = require('path');
const http = require('http');
//const PORT = process.env.PORT || 3000  
const socketio = require('socket.io'); // Socket io server
const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.static(path.join(__dirname, "client"))); //Serving static folder to the client


server.listen(3000, () => { // Listening on port 
    console.log('listening on *:3000');
});
var playerNames = {};
const connections = []; // 5 players in each game 
var playerStatus = {}; //Players score, location

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

    socket.on('disconnect', () => {
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
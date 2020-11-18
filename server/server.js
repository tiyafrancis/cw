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

const numberOfConnections = [null, null, null, null, null]; // 5 players in each game 

io.on('connection', socket => { //On user connection
    var playerNumber = -1;
    for (var i in numberOfConnections) { //Iterating through the array
        if (numberOfConnections[i] == null) {
            playerNumber = i; //Setting player number to the number of the element of null
            break; //breaking the statement so it isn't repeated over and over again
        }
    }

    socket.emit('player-number', playerNumber); //Telling the user what player they are
    console.log(`Player ${playerNumber} has joined`);

    numberOfConnections[playerNumber] = false;

    socket.on('disconnect', () => {
        console.log(`Player ${playerNumber} has disconnected`);
        numberOfConnections[playerNumber] = null;
    })

    //Ignoring additional players 

    if (playerNumber == 6) {
        return;
    }
});
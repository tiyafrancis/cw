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
    console.log('listening on port:3000');
});
var playerNames = {};
const connections = []; // 5 players in each game 
var playerStatus = {}; //Players score, location
var playerStatus_console = {}



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
        console.log(`aww ${socket.id} just left`);
        playerStatus = {}
        playerStatus_console = {}
    })

    socket.on('player-joined', () => {
        connections.push(socket.id);
        socket.emit('player-joined-notification', { playerNumber: connections.indexOf(socket.id) })
    })

    socket.on('playerPosition', data => {
        playerStatus_console[socket.id] = (data.playerPosition);
        playerStatus[socket.id] = (data.playerPosition + "<div id='headerpicture'></div>");
        console.log(playerStatus_console);
        var myJSON = JSON.stringify(playerStatus);
        myJSON = myJSON.replace(/[{","​​​​​}​​​​​]/g, '');
        // console.log(myJSON);
        socket.emit('scores', myJSON);

    })

    socket.on('playerScore', data => {
        playerStatus[socket.id] = (data.playerScore);
        console.log(playerStatus);
    })


    // TODO: setInterval function 


    //socket.emit('totalscore', playerStatus.score); 
    socket.on('gameover', data => {
        socket.broadcast.emit('gameover2', data);
    })

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
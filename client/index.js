// 1 = <div class="wall"></div>  
// 2 = <div class="player"></div>  By default player model is set to right 
// 3 = <div class="bg"></div>
// 4 = <div class="coin"> </div>
// 5 = <div class="ghost1"> </div> 
// 6 = <div class="ghost2"> </div> 
// 7 = <div class="ghost3"> </div> 
// 8 = <div class='player_down'></div>
// 9 = <div class='player_left'></div>
// 10 = <div class='player_up'></div>
// The numbers used below in the comments are used for reference, the number of moveable rows
var world = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 2, 3, 4, 3, 4, 3, 4, 3, 4, 3, 3, 4, 3, 1], //1
    [1, 3, 1, 1, 1, 1, 3, 1, 1, 1, 4, 1, 1, 4, 1], //2
    [1, 4, 1, 3, 4, 3, 3, 4, 1, 1, 4, 1, 1, 3, 1], //3
    [1, 3, 4, 4, 3, 1, 3, 4, 1, 3, 3, 4, 3, 3, 1], //4  
    [1, 3, 1, 1, 4, 1, 1, 1, 1, 4, 1, 1, 4, 1, 1], //5  !
    [1, 1, 1, 4, 3, 4, 3, 4, 1, 3, 4, 1, 3, 4, 1], //6  !
    [1, 3, 4, 3, 1, 1, 4, 1, 1, 1, 3, 4, 1, 3, 1], //7  !
    [1, 4, 1, 3, 3, 4, 1, 3, 3, 4, 1, 3, 1, 3, 1], //8  !
    [1, 3, 3, 1, 4, 1, 3, 3, 1, 4, 1, 3, 3, 4, 1], //9  !  
    [1, 1, 4, 1, 1, 1, 3, 1, 4, 1, 3, 1, 3, 1, 1], //10 !
    [1, 4, 4, 4, 3, 3, 4, 3, 4, 1, 3, 4, 3, 4, 1], //11 !
    [1, 1, 1, 3, 1, 3, 1, 3, 1, 1, 1, 3, 1, 3, 1], //12 !
    [1, 4, 4, 3, 4, 3, 1, 3, 4, 3, 4, 3, 3, 4, 1], //13 !
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
]

var pacman = {
    xaxis: 1,
    yaxis: 1
}
var userName = prompt("Please enter a username");
var playerScore = 0;
var totalGameScore = 0;
document.getElementById('scoreboard').innerHTML = "Score: " + playerScore;




function drawMap() {
    document.getElementById('map').innerHTML = " "
    for (var yaxis = 0; yaxis < world.length; yaxis++) { //initialize x and yaxis, 
        console.log(world[yaxis])
        for (var xaxis = 0; xaxis < world[yaxis].length; xaxis++) {
            console.log(world[yaxis][xaxis]) //Itearte through x and y axis's 
            if (world[yaxis][xaxis] == 1) { // If x or y axis is 1, return wall to the map div 
                document.getElementById('map').innerHTML += "<div class='wall'></div>";
            } //Similarly for the following
            else if (world[yaxis][xaxis] == 3) {
                document.getElementById('map').innerHTML += "<div class='bg'></div>";
            } else if (world[yaxis][xaxis] == 2) {
                document.getElementById('map').innerHTML += "<div class='player'></div>";
            } else if (world[yaxis][xaxis] == 4) {
                document.getElementById('map').innerHTML += "<div class='coin'></div>";
            } else if (world[yaxis][xaxis] == 5) {
                document.getElementById('map').innerHTML += "<div class='ghost1'></div>";
            } else if (world[yaxis][xaxis] == 6) {
                document.getElementById('map').innerHTML += "<div class='ghost2'></div>";
            } else if (world[yaxis][xaxis] == 7) {
                document.getElementById('map').innerHTML += "<div class='ghost3'></div>";
            } else if (world[yaxis][xaxis] == 8) {
                document.getElementById('map').innerHTML += "<div class='player_down'></div>";
            } else if (world[yaxis][xaxis] == 9) {
                document.getElementById('map').innerHTML += "<div class='player_left'></div>";
            } else if (world[yaxis][xaxis] == 10) {
                document.getElementById('map').innerHTML += "<div class='player_up'></div>";
            }
        }
        document.getElementById('map').innerHTML += "<br>"; //Break statement so every nested array is 
        // is printed out seperately 
    }
}
drawMap(); //Calling the above funtion and printing out the map 

// Movement 
document.onkeydown = function(e) { // This fcution basically runs whenever you hit any key 
    console.log(world[pacman.yaxis][pacman.xaxis]); // Pacmans position in the array 
    // If you hit any key the above code runs on the console, I used hello so that i could find the code above that on the console
    if (e.key === "ArrowLeft") { //Left
        if (world[pacman.yaxis][pacman.xaxis - 1] !== 1) { //1 is the wall, if there is no wall to the left (x axis -1) then execute following code
            if (world[pacman.yaxis][pacman.xaxis - 1] == 4) {
                ++playerScore;
            }
            world[pacman.yaxis][pacman.xaxis] = 3; //Pacman's old position being replaced with the background
            pacman.xaxis = pacman.xaxis - 1; // Reducing the x axis so pacman moves left 
            world[pacman.yaxis][pacman.xaxis] = 9; // Replacing new position with pacman
            // score();
            drawMap(); // We call the drawMap func every time because we redraw the map everytime the statemnt gets executed 
        }

    } else if (e.key === "ArrowUp") { // Up
        if (world[pacman.yaxis - 1][pacman.xaxis] !== 1) { // Same logic^
            if (world[pacman.yaxis - 1][pacman.xaxis] == 4) {
                ++playerScore;
            }
            world[pacman.yaxis][pacman.xaxis] = 3;
            pacman.yaxis = pacman.yaxis - 1;
            world[pacman.yaxis][pacman.xaxis] = 10;
            //   score();
            drawMap();
        }

    } else if (e.key === "ArrowRight") { // Right 
        if (world[pacman.yaxis][pacman.xaxis + 1] !== 1) {
            if (world[pacman.yaxis][pacman.xaxis + 1] == 4) {
                ++playerScore;
            }
            world[pacman.yaxis][pacman.xaxis] = 3;
            pacman.xaxis = pacman.xaxis + 1;
            world[pacman.yaxis][pacman.xaxis] = 2;
            //score();
            drawMap();
        }

    } else if (e.key === "ArrowDown") { //Down
        if (world[pacman.yaxis + 1][pacman.xaxis] !== 1) {
            if (world[pacman.yaxis + 1][pacman.xaxis] == 4) {
                ++playerScore;
            }
            world[pacman.yaxis][pacman.xaxis] = 3;
            pacman.yaxis = pacman.yaxis + 1;
            world[pacman.yaxis][pacman.xaxis] = 8;
            //  score();
            drawMap();

        }

    }
    totalGameScore = playerScore; // + other player scores. yet to be implemented
    function gameOver() {
        if (totalGameScore == 47) {
            alert("Nice work " + userName + "!!");
        }
    }
    drawMap();
    gameOver();

    console.log("Im here");
    console.log("Score is " + playerScore);
    document.getElementById('scoreboard').innerHTML = "Score: " + playerScore;
}
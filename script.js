
// Map from https://codepen.io/devbedolla8/pen/gOMwvvK
// subject to change
const map = [
    "WWSWWWWWWWWWWWWWWWWWW",
    "W   W     W     W W W",
    "W W W WWW WWWWW W W W",
    "W W W   W     W W   W",
    "W WWWWWWW W WWW W W W",
    "W         W     W W W",
    "W WWW WWWWW WWWWW W W",
    "W W     SSSSS       W",
    "W WWWWW W W W WWW W S",
    "S     W W W W W W WWW",
    "WWWWW W W W W W W W W",
    "W     W W W   W W W W",
    "W WWWWWWW WWWWW W W W",
    "W       W       W   W",
    "WWWSWWWWWWWWWWSWWWWWW",
];
let player = {
    row: 9,
    col: 0

}
function buildMaze(map) {
    let mazeEl = document.getElementById('maze')
    for (let i = 0; i < map.length; i++) {
        const mapArr = map[i];
        const rowDiv = document.createElement('div')
        rowDiv.classList.add('row')
        for (let a = 0; a < mapArr.length; a++) {
            const currentB = mapArr[a]
            let divNew = document.createElement('div')
            divNew.dataset.index= i + "," + a
            switch (currentB) {
                case 'W':
                    divNew.className = 'wall'
                    divNew.dataset.celltype = 'wall'
                    break
                case 'S':
                    divNew.className = 'space start'
                    divNew.dataset.celltype = 'start'
                    break
                case 'F':
                    divNew.className = 'space finish'
                    divNew.dataset.celltype = 'finish'
                    break
                case ' ':
                    divNew.className = 'space'
                    divNew.dataset.celltype = 'space'
                    break
            }
            rowDiv.append(divNew);
            mazeEl.append(rowDiv);
        }

    }
}
buildMaze(map) 



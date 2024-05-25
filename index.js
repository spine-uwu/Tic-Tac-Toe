const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#statusText");
const reset = document.querySelector("#reset");
const win = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];
let options = ["", "", "", "", "", "", "", "", "",];
let currentPlayer = "X";
let running = false;

start()

function start(){
    cells.forEach(cell => cell.addEventListener("click", clickedcell));
    reset.addEventListener("click", resetGame);
    statusText.textContent = `${currentPlayer}'s turn`;
    running = true;
}

function clickedcell(){
    const cellno = this.getAttribute("cellno");

    if (options[cellno] != ""||!running){
        return;
    }

    updateCell(this, cellno);
    checkWinner();
}
function updateCell(cell, index){
    options[index] = currentPlayer;
    cell.textContent = currentPlayer;
}

function changePlayer(){
    currentPlayer = (currentPlayer == "X") ? "O" : "X";
    statusText.textContent = `${currentPlayer}'s turn`;
}
function checkWinner(){
    let roundwon = false;

    for (let i = 0; i < win.length; i++){
        const condition = win[i];
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];

        if(cellA == "" || cellB == "" ||cellC == ""){
            continue;
        }
        if (cellA == cellB && cellB == cellC ){
            roundwon = true;
            break;
        }

    
    }
    if(roundwon){
        statusText.textContent = `${currentPlayer} wins`;
        running = false;

    }
    else if(!options.includes("")){
        statusText.textContent = `Draw!`;
        running = false;
    }
    else{
        changePlayer();
    }
}
function resetGame(){
    currentPlayer = "X";
    options = ["", "", "", "", "", "", "", "", "",];
    statusText.textContent = `${currentPlayer}'s turn`;
    cells.forEach(cell => cell.textContent = "");
    running = true;
}
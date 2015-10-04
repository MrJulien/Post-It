document.getElementById("enterBoardButton").addEventListener("click", init);

var board = null;

function init() {
    board = new Board();
    board.initBoard();
}
document.getElementById("enterBoardButton").addEventListener("click", init);

function init() {
    var board = new Board();
    board.initBoard();
}
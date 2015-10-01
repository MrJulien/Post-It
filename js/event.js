document.getElementById("boardButton").addEventListener("click", init);

function init() {
    var board = new Board();
    board.initBoard();
}
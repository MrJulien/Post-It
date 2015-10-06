function LaunchControl() {
    this.board;
}

LaunchControl.prototype = {

    initialize: function() {
        this.boardListener();
    },
    
    boardListener: function() {
        _this = this;
        var buttonBoard = document.getElementById("enterBoardButton");
        buttonBoard.addEventListener("click", function(){
            if(document.getElementById("inputBoardName").value != "") {
                _this.board = new Board();
                _this.board.initBoard();
                _this.createPostItListener();
            }
            else {
                alert("Nom du tableau incorrect");
            }
        });
    },
    
    createPostItListener: function() {
        _this = this;
        document.getElementById("buttonPostIt").addEventListener("click", function(){
            var postIt = new PostIt(_this.board, new Date(), "");
            postIt.create();
        });
    }
};

(function(){
    var launchControl = new LaunchControl();
    launchControl.initialize();
})()
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
                this.board = new Board();
                this.board.initBoard();
                _this.postItListener();
            }
            else {
                alert("Nom du tableau incorrect");
            }
        });
    },
    
    postItListener: function() {
        document.getElementById("buttonPostIt").addEventListener("click", function(){
                console.log("createPostIt");
            });
    }
};

(function(){
    var launchControl = new LaunchControl();
    launchControl.initialize();
})()
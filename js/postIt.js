function PostIt(board, id, content, dx, dy) {
    this.id = id;
    this.content = content;
    this.board = board;
    this.dx = dx;
    this.dy = dy;
}

PostIt.prototype = {

    create: function () {
        var _this = this,
            divPostIt = document.createElement("div");

        divPostIt.id = "postIt" + this.id;
        divPostIt.className = "col-md-2 col-xs-12 col-sm-6 panel panel-success draggable";
        divPostIt.style.position = "absolute";
        document.getElementById("rowBoard").appendChild(divPostIt);
        divPostIt.style.transform = "translate(" + this.dx + "px," + this.dy + "px)";
        divPostIt.setAttribute("data-x", this.dx);
        divPostIt.setAttribute("data-y", this.dy);

        var divPostItBody = document.createElement("div");
        divPostItBody.className = "panel-body";
        divPostIt.appendChild(divPostItBody);

        var textareaPostIt = document.createElement("textarea");
        textareaPostIt.id = "postItText" + this.id;
        textareaPostIt.className = "form-control";
        if (this.content == "") {
            textareaPostIt.setAttribute("placeholder", "Contenu de votre post-it");
        } else {
            textareaPostIt.value = _this.content;
        }
        divPostItBody.appendChild(textareaPostIt);

        this.contentlistener();
        this.endMovelistener();

    },

    contentlistener: function () {
        var _this = this,
            postIt = document.getElementById("postIt" + this.id);

        document.getElementById("postItText" + this.id).addEventListener("change", function (e) {
            _this.content = e.currentTarget.value;
            _this.board.sendMessage({
                content: _this.id + "'/'createPostIt'/'" + _this.content + "'/'" + postIt.getAttribute("data-x") + "'/'" + postIt.getAttribute("data-y")
            }, _this.board.title, true);
        });

    },

    endMovelistener: function () {
        var _this = this;
        document.getElementById("postIt" + this.id).addEventListener("endMove", function (e) {
            var postIt = e.currentTarget;
            _this.content = e.currentTarget.getElementsByTagName("textarea")[0].value;
            _this.board.sendMessage({
                content: _this.id + "'/'createPostIt'/'" + _this.content + "'/'" + postIt.getAttribute("data-x") + "'/'" + postIt.getAttribute("data-y")
            }, _this.board.title, true);
        });
    }
};
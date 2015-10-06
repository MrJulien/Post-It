function PostIt(board, id, content) {
	this.id = id;
    this.content = content;
    this.board = board;
}

PostIt.prototype = {

	create: function() {
        var _this = this,
		  divPostIt = document.createElement("div");
        
		divPostIt.id = "postIt"+this.id;
		divPostIt.className = "col-md-2 col-xs-12 col-sm-6 panel panel-success draggable";
		document.getElementById("rowBoard").appendChild(divPostIt);

		var divPostItBody = document.createElement("div");
		divPostItBody.className = "panel-body";
		divPostIt.appendChild(divPostItBody);

		var textareaPostIt = document.createElement("textarea");
		textareaPostIt.id = "postItText"+this.id;
		textareaPostIt.className = "form-control";
        if(this.content == "") {
		  textareaPostIt.setAttribute("placeholder", "Contenu de votre post-it");
        }
        else {
            textareaPostIt.value = _this.content;
        }
		divPostItBody.appendChild(textareaPostIt);
        
        this.contentlistener();

	},

	contentlistener: function() {
        var _this = this;

		document.getElementById("postItText"+this.id).addEventListener("change", function(e){
			_this.content = e.currentTarget.value;
            _this.board.sendMessage({content : _this.id+"'/'createPostIt'/'"+_this.content}, _this.board.title, true);
		});
	}
	
};
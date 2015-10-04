var postId = 0;

function PostIt() {
	postId++;
	this.postItId = postId;
    this.postItContent = "";
}

PostIt.prototype = {

	create: function() {
		var divPostIt = document.createElement("div");
		divPostIt.id = "postIt"+this.postItId;
		divPostIt.className = "col-md-2 col-xs-12 col-sm-6 panel panel-success draggable";
		document.getElementById("rowBoard").appendChild(divPostIt);

		var divPostItBody = document.createElement("div");
		divPostItBody.className = "panel-body";
		divPostIt.appendChild(divPostItBody);

		var textareaPostIt = document.createElement("textarea");
		textareaPostIt.id = "postItText"+this.postItId;
		textareaPostIt.className = "form-control";
		textareaPostIt.setAttribute("placeholder", "Contenu de votre post-it");
		divPostItBody.appendChild(textareaPostIt);

	},

	listener: function() {
		document.getElementById("postItText"+this.postItId).addEventListener("change", function(e){
			this.postItContent = e.currentTarget.value;
		});
	}
	
};
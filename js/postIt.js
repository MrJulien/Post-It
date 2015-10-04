function PostIt(content) {
    this.content = content;
}

PostIt.prototype = {

	initPostIt: function() {
		alert("content : " + this.content);
	}
	
};
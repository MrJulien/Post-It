function Board() {
    this.title = document.getElementById("inputBoardName").value;
    this.body = document.getElementsByTagName("body")[0];
    this.cobra = new Cobra();
}

Board.prototype = {
    
    initBoard: function () {        
        this.body.removeChild(document.getElementById("initBoard"));
        
        var divBoard = document.createElement("div");   
        divBoard.id = "board";
        this.body.appendChild(divBoard);
        
        var buttonPostIt = document.createElement("button");   
        buttonPostIt.id = "buttonPostIt";
        buttonPostIt.className = "btn btn-success btn-lg";
        buttonPostIt.innerHTML = "<span class='glyphicon glyphicon-plus' aria-hidden='true'></span>";
        divBoard.appendChild(buttonPostIt);

        var buttonDeletePostIt = document.createElement("button")
        buttonDeletePostIt.id= "buttonDeletePostIt";
        buttonDeletePostIt.className = "btn btn-danger btn-lg";
        buttonDeletePostIt.innerHTML = "<span class='glyphicon glyphicon-trash' aria-hidden='true'></span>";
        divBoard.appendChild(buttonDeletePostIt);

        var divRow = document.createElement("div");
        divRow.id = "rowBoard";
        divRow.className = "row";
        divBoard.appendChild(divRow);
        
        this.initCobra();
    },
    
    initCobra: function () {
        var cobra = this.cobra,
            room =  this.title,
            socketId,
            apiUrl = 'http://cobra-framework.com:3000/api/events/' + room,
            _this = this;

        cobra.connect('http://cobra-framework.com:8080');

        cobra.connectionCallback = function () {
            cobra.joinRoom(room);
        };

        cobra.joinRoomCallback = function (roomName) {
           // appel à l'API pour récupérer tous les messages de la room roomName
            $.ajax({
                type: 'GET',
                url: apiUrl,
                success: function () {
                    console.log("success");
                },

                error: function () {
                    console.log("error when retrieve events");
                },

                complete: function (result, status) {
                    console.log("complete");
                
                    var postItTab = [],
                        postItTabId = [],
                        index;
                    
                    for (var i = 0; i < result.responseJSON.Events.length; i++) {
                        var content = JSON.parse(result.responseJSON.Events[i].content).message.content;
                        // recuperer les infos contenues dans les messages
                        var split = content.split("'/'"),
                            goal = split[1];

                        if(goal == "createPostIt") {
                            var postIt = {
                                board : _this,
                                id : split[0],
                                contentPostIt : split[2]
                            };
                        }

                        index = postItTabId.indexOf(postIt.id);
                        if(index == -1) {
                            postItTabId.push(postIt.id);
                            postItTab.push(postIt);
                        }
                        else {
                            postItTab[index] = postIt;
                        }
                    }
                    
                    for (var i = 0; i < postItTab.length; i++) {
                        var postIt = new PostIt(postItTab[i].board, postItTab[i].id, postItTab[i].contentPostIt);
                        postIt.create();
                    }
                        
                    // Pour envoyer un message dans toute la room
                    // cobra.sendMessage({content : "test"}, room, true);

                    // Pour envoyer un message dans toute la room excepté soi
                    // cobra.sendMessage({content : "test"}, room, false);
                 }
              });
            }

            cobra.messageReceivedCallback = function (message) {      
                // Lors de l'arrivée dans une room donne la liste des utilisateurs contenus dans la room
                if(message.type == "infos"){
                    for(var i = 0; i < message.clients.length; i++)
                    {
                        // Contient l'id du client
                        var client = message.clients[i];
                    }
                    // Mon id attribué par la room
                    socketId = message.socketId;
                }
                else if (message.message) {
                   // Message reçu, je le traite
                    var split = message.message.content.split("'/'"),
                        id = split[0],
                        goal = split[1],
                        contentPostIt = split[2];
                    
                    if(document.getElementById("postIt"+id) == null) {
                        var postIt = new PostIt( _this, id, contentPostIt);
                        postIt.create();
                    }
                    else {
                        document.getElementById("postItText"+id).value = contentPostIt;
                    }         
               }
            }

            cobra.clientJoinedRoomCallback = function(data){
                // Un autre client a rejoint la room
            }

            cobra.clientLeftRoomCallback = function(data){
                // Un client a quitté la room
        }
    },
    
    sendMessage: function(message, roomName, toAll) {
        this.cobra.sendMessage(message, roomName, toAll);
    }
};
function Board() {
    this.title = document.getElementById("inputBoardName").value;
    this.postIt = 0;
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
        buttonPostIt.className = "btn btn-default btn-lg";
        buttonPostIt.innerHTML = "<span class='glyphicon glyphicon-plus' aria-hidden='true'></span>";
        divBoard.appendChild(buttonPostIt);
        
        this.initCobra();
    },

    initCobra: function () {
        var cobra = this.cobra,
            room =  this.title,
            socketId,
            apiUrl = 'http://cobra-framework.com:3000/api/events/' + room;

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

                  if (result.responseJSON.Events.length > 0)
                    this.postIt = result.responseJSON.Events.length;

                  for (var i = 0; i < result.responseJSON.Events.length; i++) {
                    var content = result.responseJSON.Events[i].content;
                     // recuperer les infos contenues dans les messages
                    console.log(content);  
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
                   console.log(message.message);
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
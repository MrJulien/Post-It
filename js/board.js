function Board() {
    if (document.getElementById("inputBoardName").value.length > 0) {
        this.title = document.getElementById("inputBoardName").value;
        this.myBoard = [];
        this.body = document.getElementsByTagName("body")[0];
        this.postIt = 0;

        this.initBoard();
    }
}

Board.prototype = {
    
    initBoard: function () {        
        this.initCobra();
        this.initPostItBoard();
    },

    initPostItBoard: function () {
        document.getElementById('inputBoardName').setAttribute('placeholder', 'Nom de votre Post-it');
        document.getElementById('inputBoardName').value = '';
        document.getElementById('inputBoardName').setAttribute('id', 'inputPostItName');

        document.getElementById('initBoardDiv').setAttribute('id', 'boardDiv');

        document.getElementById('enterBoardButton').setAttribute('onclick', '');
        document.getElementById('enterBoardButton').setAttribute('id', 'addPostItButton');

        document.getElementById('addPostItButton').childNodes[0].setAttribute('class', 'fa fa-plus');
    },

    createPostIt: function() {

    },
    
    initCobra: function () {
        var cobra = new Cobra(),
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
    }
           
};
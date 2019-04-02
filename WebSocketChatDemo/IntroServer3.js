
var severmodule = require("ws");

var server = new servermodule.Sever("ws://localhost:8181");
var clients = [];

server.Start((socket) =>{

    socket.OnOpen = () =>{  clients.push(socket);     }

    socket.OnClose = () => {
        // Remove the disconnected client from the list.
        
     };

    socket.OnMessage = (message)=> {
        // Display the message on the console.
        console.log(message);

        for(client in clients) {
            // Send the message to everyone!
            // Also, send the client connection's unique identifier in order
            // to recognize who is who.
            client.send( message.toUpperCase());
         }
     }
});


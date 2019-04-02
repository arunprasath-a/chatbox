var WebSocket = require("ws");

var server = new WebSocket.Server({ port: 9090 });
var allClientSockets = [];
var clientNickNames = [];

console.log("server initialized successfully... ");

server.on("connection", f1);

function f1(socket) {
    console.log("one client is connected now...!");
    allClientSockets.push(socket);
    console.log("Total no of clients connected : " + allClientSockets.length)
    socket.on("message", f2);
    //socket.send("Hurray... ! you are connected to the server now !!!")
}

function f2(message) {
    var action = message.substr(0, 4);
    console.log(action);
    var result = message.toUpperCase() + "message";

    var parsedInput = JSON.parse(message.substr(5));
    console.log(parsedInput);
    if (action == 'join') {
        if (parsedInput.name && parsedInput.timeOfLogin) {
            clientNickNames.push(parsedInput.name);
            console.log(parsedInput.name);
            console.log(parsedInput.timeOfLogin);
        }
    }

    console.log("sending to clients :" + result);
    for (var i = 0; i < allClientSockets.length; i++) {
        //allClientSockets[i].send(result);
        if (action == 'join') {
            var allObj = {
                "currentUsers": clientNickNames
            }
        }
        console.log("test action is " + action);
        if (action == 'chat') {
            //var replyObj = JSON.parse(parsedInput);
            var resultObj = {
                "nick": parsedInput.nickName,
                "msg": parsedInput.chatData
            }
            console.log("result obj is" + resultObj.nickName +","+resultObj.chatData);
        }
        var userListSTR = JSON.stringify(allObj);
        console.log(userListSTR);
        allClientSockets[i].send(userListSTR);
        var resultSTR = JSON.stringify(resultObj);
        console.log("Result string is " + resultSTR);
        allClientSockets[i].send(resultSTR);
    }
}

function ChatUser(n) {
    this.name = n;
    this.timeOfLogin = new Date();
}

function ChatMessage(n, m) {
    this.nickName = n;
    this.chatData = m;
    this.timeOfMessage = new Date();
}
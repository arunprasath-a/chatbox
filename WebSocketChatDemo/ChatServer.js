var severmodule = require("ws");

var wss = new severmodule.Server({ port: 9090 });
console.log("Sever started ....waiting client to accept")

wss.on('connection', ws => {
    ws.on('message', message => {
      console.log(`Received message => ${message}`)
      ws.send('ho!'+message)
    })
    ws.send('ho!')
  })

/*wss.on('connection', f1)
function f1(ws) {
    ws.on('message', f2);
}

function f2(ms) {
    console.log(ms);
    ws.send(ms)
}*/

"use struct";

if(hexo.env.cmd !== "s") return;

const WebSocket = require("ws");
const wss = new WebSocket.Server({ port: 3000 });

console.log("hexo-hotreloader listening on ws://localhost:3000");

var ws_clients={};

wss.addListener("connection", ws => {
  ws.addEventListener("message", msg => {
    console.log(msg.data+" connected");
    if(!ws_clients.hasOwnProperty(msg.data))
      ws_clients[msg.data]=[];
    ws_clients[msg.data].push(ws);
  })
});

hexo.extend.filter.register(
  "after_post_render",
  data=>{
    // 发送信息给客户端 
    if(ws_clients.hasOwnProperty(data?.title)){
      ws_clients[data?.title].forEach(ws=>ws.send(data.content));
    }
    return data;
  },
  30
);

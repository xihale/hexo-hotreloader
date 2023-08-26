"use struct";

if((hexo.env.cmd !== "s" && hexo.env.cmd !== "server")|| hexo.config.hotreloader?.enable!==true) return;

const {frontend}=require("./frontend.js");

const WebSocket = require("ws");
const wss = new WebSocket.Server({ port: 3000 });

console.log("hexo-hotreloader listening on ws://localhost:3000");

var ws_clients={}, cnt={};

wss.addListener("connection", ws => {
  ws.addEventListener("message", msg => {
    console.log(msg.data+" connected");
    if(!ws_clients.hasOwnProperty(msg.data))
      ws_clients[msg.data]=[], cnt[msg.data]=0;
    ws_clients[msg.data].push(ws);
    ++cnt[msg.data];
  })
});

hexo.extend.filter.register(
  "after_post_render",
  data=>{
    if(ws_clients.hasOwnProperty(data?.title)){
      ws_clients[data?.title].forEach(ws=>{
        try{
          ws.send(data.content)
        }catch(_){ // connection closed 
          --cnt[data?.title];
        }
      });
    }
    if(cnt[data?.title]===undefined || cnt[data?.title]===0) data.content+="<script>"+frontend+"</script>";
    return data;
  },
  30
);

"use struct";

if((hexo.env.cmd !== "s" && hexo.env.cmd !== "server")|| hexo.config.hotreloader?.enable!==true) return;

const {frontEnd}=require("./frontEnd.js");

var port=3000;
if(hexo.config.hotreloader?.port) port=hexo.config.hotreloader.port;

const WebSocket = require("ws");
const wss = new WebSocket.Server({ port: port });

console.log(`hexo-hotreloader listening on ws://localhost:${port}`);

var ws_clients={}, sources=[];

wss.addListener("connection", ws => {
  ws.addEventListener("message", msg => {
    console.log(msg.data+" connected");
    if(!ws_clients.hasOwnProperty(msg.data))
      ws_clients[msg.data]={};
    ws_clients[msg.data][ws]=ws;
    ws.addEventListener('close', ()=>{
      ws_clients[msg.data][ws]=undefined;
      if(!sources.hasOwnProperty(msg.data)) return; // was rendered for frontend code
      // triger the render forcely
      const fs=require("fs");
      const path=process.cwd()+"/source/"+sources[msg.data];
      const _path=path+"._bak";
      fs.renameSync(path, _path);
      fs.renameSync(_path, path);
    });
  })
});

hexo.extend.filter.register(
  "after_post_render",
  data=>{
    if(data.title===undefined){
      data.content+="<script>"+frontEnd.toString()+`hotReloader(${port})</script>`;
      return data;
    }
    for(let key in ws_clients[data.title]){
      const ws=ws_clients[data.title][key];
      if(ws===undefined) // delay delete
        delete ws_clients[data.title][key];
      else ws.send(data.content);
    }
    if(sources[data.title]===undefined) sources[data.title]=data.source;
    if(ws_clients[data.title]===undefined || Object.keys(ws_clients[data.title]).length===0) data.content+="<script>"+frontEnd.toString()+`hotReloader(${port})</script>`;
    return data;
  },
  30
);

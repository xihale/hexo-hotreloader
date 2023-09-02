exports.frontEnd = function hotReloader(port){
  var h1 = document.getElementsByTagName("h1"), content = document.querySelector("div.e-content") ?? document.getElementsByTagName("article")[0] ?? document.getElementById("page"), title = "";
  for (let k in h1) if (h1[k].className?.includes("title")) title = h1[k].innerText;
  if (title === "") throw new Error("There is no title.");
  var ws = new WebSocket(`ws://localhost:${port}`);
  ws.addEventListener("open", function () { console.log("Connect Ok"); ws.send(title) });
  ws.addEventListener("message", e => { content.innerHTML = e.data });
}
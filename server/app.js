const Koa = require("koa");
const KoaLogger = require("koa-logger");
const KoaRouter = require("@koa/router");
const KoaCORS = require("@koa/cors");
const WebSocket = require("ws");
const models = require("./models/machines");

const { machines } = require("./routes");

const router = new KoaRouter();

const ws = new WebSocket.Server({ port: 3002 });

ws.on("connection", (ws) => {
  console.log("socket server connect success");

  ws.on("message", (msg) => {
    console.log("socket server receive msg：", msg);
  });

  setInterval(() => {
    ws.send(
      JSON.stringify({ type: "update_machine", payload: models.refresh() })
    );
  }, 10000);
});

const app = new Koa();

app.use(KoaLogger());
app.use(KoaCORS());

router.prefix("/api/v1");

router.get("/", (ctx, next) => {
  ctx.body = "api/v1 server";
});

app.use(router.routes()).use(router.allowedMethods());
router.use(machines.routes()).use(machines.allowedMethods());

app.listen(3001);

console.log("[server] start-quick is starting at port 3001");

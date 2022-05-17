const KoaRouter = require("@koa/router");
const router = new KoaRouter();
const { list, detail } = require("../models/machines");

router.prefix("/machines");

router.get("/", (ctx, next) => {
  ctx.body = list();
});

router.get("/:machine_id", (ctx, next) => {
  let { machine_id } = ctx.params;
  let data = detail();
  data.data.id = machine_id;
  ctx.body = data;
});

module.exports = router;

const router = new (require("restify-router").Router)();
const {
  getItens,
  getAllItens,
  insertItens,
  alterItem,
  removeItem,
  amountCalc,
} = require("../controller/itens");

router.get("/", async function (req, res, next) {
  res.json(await getItens());
});

router.get("/all", async function (req, res, next) {
  res.json(await getAllItens());
});

router.post("/", async function (req, res, next) {
  res.json(await insertItens(req.body));
});

router.post("/calcular", async function (req, res, next) {
  try {
    res.json(await amountCalc(req.body.bbq));
  } catch (err) {
    res.status(500);
  }
});

router.put("/:id", async function (req, res, next) {
  try {
    res.json(await alterItem(req.params.id, req.body));
  } catch (e) {
    res.status(500);
  }
});

router.del("/:id", async function (req, res, next) {
  try {
    res.json(await removeItem(req.params.id));
  } catch (e) {
    res.status(500);
  }
});

module.exports = router;

const model = require("../model");

async function getAllItens() {
  try {
    return await model.select().from("bbq");
  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function getItens() {
  try {
    return await model.select("item").from("bbq");
  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function getItem(id) {
  try {
    return await model.select().from("bbq").where({ id });
  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function insertItens({ item, qtd_man, qtd_wman, qtd_child }) {
  try {
    const id = await model("bbq").insert({
      item,
      qtd_man,
      qtd_wman,
      qtd_child,
    });
    return getItem(id);
  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function alterItem(id, body) {
  try {
    await model("bbq").update(body).where({ id });
    return getItem(id);
  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function removeItem(id) {
  try {
    await model("bbq").del().where({ id });
  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function amountCalc({ qtdMan, qtdWMan, qtdChild }) {
  const bbqValues = await model.select().from("bbq");
  const bbqTotal = {};

  for (const bbqObj of bbqValues) {
    bbqTotal[bbqObj.item] = (
      qtdMan * parseFloat(bbqObj.qtd_man) +
      qtdWMan * parseFloat(bbqObj.qtd_wman) +
      qtdChild * parseFloat(bbqObj.qtd_child)
    ).toFixed(3);
  }
  return bbqTotal;
}

module.exports = {
  getItens,
  getAllItens,
  insertItens,
  alterItem,
  removeItem,
  amountCalc,
};

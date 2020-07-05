const { client, connection } = require("./database.json");

const knex = require("knex")({
  client,
  connection,
});

module.exports = knex;

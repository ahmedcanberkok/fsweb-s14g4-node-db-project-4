// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './data/tarifs.db3'
    }
  },
  migrations: {
    directory:"./data/migrations"
  },
  seeds: {
    directory:"./data/seeds"
  },
  pool : {
    afterCreate: (conn,done) => {
      conn.run("PRAGMA foreign_keys = ",done)
    }
  }


};

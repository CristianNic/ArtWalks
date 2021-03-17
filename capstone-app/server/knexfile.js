// Update with your config settings.

module.exports = {
  
  production: {
    client: "mysql",
    connection: {
      host: "127.0.0.1",
      user: "root",
      password: "rootroot",
      database: "art_walk",
      charset: "utf8",
    },
  },
  development: {
    client: 'sqlite3',
    connection: {
      filename: './dev.sqlite3'
    }
  }
};

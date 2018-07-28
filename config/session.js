const session = require('express-session');
const SelquelizeStore = require('connect-session-sequelize')(session.Store);
const { sequelize } = require('../app/models');

module.exports = {
  secret: 'snippetfy2018rocketseat',
  resave: false,
  saveUninitialized: false,
  store: new SelquelizeStore({
    db: sequelize,
  }),
};

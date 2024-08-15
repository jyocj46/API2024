

const env = require('./env.js');
 
const Sequelize = require('sequelize');
const sequelize = new Sequelize(env.database, env.username, env.password, {
  host: env.host,
  dialect: env.dialect,
  dialectOptions:{
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
  operatorsAliases: false,
 
  pool: {
    max: env.max,
    min: env.pool.min,
    acquire: env.pool.acquire,
    idle: env.pool.idle,
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
 
db.Customer = require('../models/customer.model.js')(sequelize, Sequelize);
db.Employee = require('../models/employee.model.js')(sequelize, Sequelize); 
db.Product = require('../models/product.model.js')(sequelize, Sequelize);
db.Categorie = require('../models/categorie.models.js')(sequelize, Sequelize);
db.Cliente = require('../models/cliente.models.js')(sequelize, Sequelize);

db.Cancion = require('../models/cancion.models.js')(sequelize, Sequelize);
db.Libro = require('../models/libro.models.js')(sequelize, Sequelize);
db.Prestamos = require('../models/prestamos.models.js')(sequelize, Sequelize);

module.exports = db;
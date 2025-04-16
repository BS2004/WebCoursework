const Datastore = require('gray-nedb');
const classesDB = new Datastore({ filename: 'db/classes.db', autoload: true });

module.exports = classesDB;

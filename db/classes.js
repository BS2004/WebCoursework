const Datastore = require('nedb');
const classesDB = new Datastore({ filename: 'db/classes.db', autoload: true });

module.exports = classesDB;
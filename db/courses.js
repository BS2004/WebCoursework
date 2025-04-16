const Datastore = require('nedb');
const coursesDB = new Datastore({ filename: 'db/courses.db', autoload: true });

module.exports = coursesDB;
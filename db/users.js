
const Datastore = require('nedb');
const usersDB = new Datastore({ filename: 'db/users.db', autoload: true });

usersDB.findOne({ username: 'admin' }, (err, user) => {
  if (!user) {
    usersDB.insert({ username: 'admin', password: 'admin123', role: 'organiser' });
  }
});

module.exports = usersDB;
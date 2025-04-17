const express = require('express');
const router = express.Router();

const usersDB = require('../db/users');
const coursesDB = require('../db/courses');
const classesDB = require('../db/classes');

function isAuthenticated(req, res, next) {
  if (req.session.user && req.session.user.role === 'organiser') return next();
  res.redirect('/login');
}

router.get('/login', (req, res) => {
  if (req.session.user && req.session.user.role === 'organiser') {
    return res.redirect('/organiser/dashboard'); // Already logged in
  }
  res.render('login');
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  usersDB.findOne({ username, password }, (err, user) => {
    if (user && user.role === 'organiser') {
      req.session.user = user;
      res.redirect('/organiser/dashboard');
    } else {
      res.send('Login failed');
    }
  });
});

router.get('/dashboard', isAuthenticated, (req, res) => {
  classesDB.find({}, (err, classes) => {
    coursesDB.find({}, (err, courses) => {
      usersDB.find({ role: 'organiser' }, (err, organisers) => {
        res.render('dashboard', { classes, courses, organisers });
      });
    });
  });
});

router.post('/course/add', isAuthenticated, (req, res) => {
  const { name, duration, description, level, type, price, startDate } = req.body;

  coursesDB.insert({
    name,
    duration,
    description,
    level,
    type,
    price,
    startDate
  }, () => res.redirect('/organiser/dashboard'));
});

router.post('/course/delete', isAuthenticated, (req, res) => {
  const { id } = req.body;

  coursesDB.remove({ _id: id }, {}, (err, numRemoved) => {
    if (err) {
      console.error("Error deleting course:", err);
      return res.send("Error deleting course.");
    }
    if (numRemoved === 0) {
      console.warn("No course deleted. ID might be invalid.");
      return res.send("Course not found or already deleted.");
    }
    res.redirect('/organiser/dashboard');
  });
});

router.post('/class/add', isAuthenticated, (req, res) => {
  const { className, date, time, location, courseId } = req.body;
  classesDB.insert({
    courseId,
    className,
    date,
    time,
    location,
    participants: []
  }, () => {
    res.redirect('/organiser/dashboard');
  });
});

router.post('/class/update', isAuthenticated, (req, res) => {
  const { id, ...updates } = req.body;
  classesDB.update({ _id: id }, { $set: updates }, {}, () => res.redirect('/organiser/dashboard'));
});

router.post('/class/delete', isAuthenticated, (req, res) => {
  const { id } = req.body;
  classesDB.remove({ _id: id }, {}, (err, numRemoved) => {
    if (err) {
      console.error('Delete failed:', err);
    }
    res.redirect('/organiser/dashboard');
  });
});

router.get('/classlist/:id', isAuthenticated, (req, res) => {
  classesDB.findOne({ _id: req.params.id }, (err, data) => {
    res.render('classlist', { participants: data?.participants || [] });
  });
});

router.post('/organiser/add', isAuthenticated, (req, res) => {
  usersDB.insert({ ...req.body, role: 'organiser' }, () => res.redirect('/organiser/dashboard'));
});

router.post('/user/delete', isAuthenticated, (req, res) => {
  usersDB.remove({ _id: req.body.id }, {}, () => res.redirect('/organiser/dashboard'));
});

module.exports = router;

const express = require('express');
const router = express.Router();

const coursesDB = require('../db/courses');
const classesDB = require('../db/classes');

router.get('/', (req, res) => {
  res.render('home');
});

router.get('/courses', (req, res) => {
  coursesDB.find({}, (err, courses) => {
    res.render('courses', { courses });
  });
});

router.get('/course/:id', (req, res) => {
  const courseId = req.params.id;
  classesDB.find({ courseId }, (err, classes) => {
    coursesDB.findOne({ _id: courseId }, (err, course) => {
      res.render('courseDetails', { course, classes });
    });
  });
});

router.post('/enroll', (req, res) => {
  const { name, classId } = req.body;

  // Find the class by its ID
  classesDB.findOne({ _id: classId }, (err, classData) => {
    if (!classData) {
      return res.send('Class not found.');
    }

    // Check if the participant is already enrolled
    const alreadyEnrolled = classData.participants?.some(p => p.toLowerCase() === name.toLowerCase());
    if (alreadyEnrolled) {
      return res.send('You are already enrolled.');
    }

    // If not, add the participant
    classesDB.update(
      { _id: classId },
      { $push: { participants: name } },
      {},
      () => {
        res.send('Enrolled successfully!');
      }
    );
  });
});

module.exports = router;
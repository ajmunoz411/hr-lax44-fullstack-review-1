const router = require('express').Router();
const controller = require('./controller.js');

// Todo: Fill out the following routes:

// routes for retrieving all students and adding a student's name
router
  .route('/students')
    .get(controller.students.getStudents)
    .post(controller.students.postName);

// router
//   .route('students/:name')
//     .post(controller.students.postName);


// route for updating a student's name
router
  .route('/students/:id')
    .put(controller.students.updateName);


// routes for adding a new student image
router
  .route('/images')
    .post(controller.images.postImg);



module.exports = router;
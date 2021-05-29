const db = require('../db/index.js');

const controller = {
  students: {
    getStudents: function (req, res) {
      var queryStr = `SELECT * FROM students INNER JOIN images ON students.id = images.id;`;
      db.query(queryStr, (err, results) => {
        err ? res.status(400).send(err) : res.status(200).send(results);
      });

    },
    postName: function (req, res) {
      // var { name } = req.params;
      var { name } = req.body;
      var queryStr = `INSERT INTO students (name) VALUES ("${name}")`;
      db.query(queryStr, (err, results) => {
        err ? res.status(400).send(err) : res.status(200).send('successful post');
      });

    },
    updateName: function (req, res) {
      var { name } = req.body;
      console.log('req body in update name', req.body);
      console.log('name in update name', name);
      var { id } = req.params;
      var queryStr = `UPDATE students SET name="${name}" WHERE id=${id};`;
      db.query(queryStr, (err, results) => {
        err ? res.status(400).send(err) : res.status(200).send(results);
      })

    },
    deleteName: function (req, res) {
      var { id } = req.params;
      var queryStr = `DELETE FROM students WHERE id=${id};`;
      db.query(queryStr, (err, results) => {
        err ? res.status(400).send(err) : res.status(200).send(results);
      })
    }
  },

  images: {
    postImg: function (req, res) {
      var { imgurl } = req.body;
      var queryStr = `INSERT INTO images (imgurl) VALUES ("${imgurl}");`;
      db.query(queryStr, (err, results) => {
        err ? res.status(400).send(err) : res.status(200).send('successful post');
      })

    },

    deleteImage: function (req, res) {
      var { id } = req.params;
      var queryStr = `DELETE FROM images WHERE id=${id};`;
      db.query(queryStr, (err, results) => {
        err ? res.status(400).send(err) : res.status(200).send(results);
      })
    }
  }
};

module.exports = controller
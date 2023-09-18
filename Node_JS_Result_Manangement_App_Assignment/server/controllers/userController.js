const req = require('express/lib/request');
const res = require('express/lib/response');
const session = require('express-session');  
const mysql = require('mysql');


let connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'studentrecord'
});

exports.teacher_login = (req, res) => {
  res.render('teacherlogin');
}

exports.student_login = (req, res) => {
  res.render('studentlogin');
}

exports.main = (req, res) => {
  res.render('index');
}

exports.home = (req, res) => {
  connection.query('SELECT * FROM student WHERE status = "active"', (err, rows) => {
    if (!err) {
      let removedUser = req.query.removed;
      res.render('home', { rows, removedUser });
    } else {
      console.log(err);
    }
    console.log('The data from student table: \n', rows);
  });
}

exports.logout = (req, res) => {
  
        res.redirect('/');
}

exports.view = (req, res) => {
  connection.query('SELECT * FROM student WHERE status = "active"', (err, rows) => {
    if (!err) {
      if(req.body.password == "abcd"){
        let removedUser = req.query.removed;
        res.render('home', { rows, removedUser });
      }
      else{
          res.render("teacherlogin", {
              error : "Please Enter Correct Password"
          })
      }
    } else {
      console.log(err);
    }
    console.log('The data from student table: \n', rows);
  });
}


exports.find = (req, res) => {
  const { roll, name } = req.body;
  connection.query('SELECT * FROM student WHERE roll = ? and name LIKE ?', [roll,'%' + name + '%'], (err, rows) => {
    if (!err) {
      res.render('studentresult', { rows });
    } else {
      console.log(err);
    }
    console.log('The data from student table: \n', rows);
  });
}

exports.form = (req, res) => {
  res.render('add-user');
}


exports.create = (req, res) => {
  const { roll, name, dob, score } = req.body;
 
  connection.query('INSERT INTO student SET roll = ?, name = ?, dob = ?, score = ?', [roll, name, dob, score], (err, rows) => {
    if (!err) {
      res.render('add-user', { alert: 'student added successfully.' });
    } else {
      console.log(err);
    }
    console.log('The data from student table: \n', rows);
  });
}



exports.edit = (req, res) => {
  connection.query('SELECT * FROM student WHERE id = ?', [req.params.id], (err, rows) => {
    if (!err) {
      res.render('edit-user', { rows });
    } else {
      console.log(err);
    }
    console.log('The data from student table: \n', rows);
  });
}



exports.update = (req, res) => {
  const { roll, name, dob, score } = req.body;
  connection.query('UPDATE student SET roll = ?, name = ?, dob = ?, score = ? WHERE id = ?', [roll, name, dob, score, req.params.id], (err, rows) => {

    if (!err) {
      connection.query('SELECT * FROM student WHERE id = ?', [req.params.id], (err, rows) => {
        
        if (!err) {
          res.render('edit-user', { rows, alert: `${name} has been updated.` });
        } else {
          console.log(err);
        }
        console.log('The data from student table: \n', rows);
      });
    } else {
      console.log(err);
    }
    console.log('The data from student table: \n', rows);
  });
}


exports.delete = (req, res) => {

  connection.query('UPDATE student SET status = ? WHERE id = ?', ['removed', req.params.id], (err, rows) => {
    if (!err) {
      let removedUser = encodeURIComponent('student successeflly removed.');
      res.redirect('/home?removed=' + removedUser);
    } else {
      console.log(err);
    }
    console.log('The data from beer table are: \n', rows);
  });

}


exports.viewall = (req, res) => {
  connection.query('SELECT * FROM student WHERE id = ?', [req.params.id], (err, rows) => {
    if (!err) {
      res.render('view-user', { rows });
    } else {
      console.log(err);
    }
    console.log('The data from student table: \n', rows);
  });

}
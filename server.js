var path = require('path');
var express = require('express');
var fs = require('fs');
var ejs = require('ejs');
var app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');



app.get('/', function(request, response) {
  response.sendFile(__dirname + '/index.html');
});

// app.get('/contact', function(request, response) {
//   response.sendFile(__dirname + '/contact.html');
// });

app.get('/main', function(request, response) {
  response.sendFile(__dirname + '/main.html');
});


// How come I hiave to res.render this ??
app.get('/about', function(req, res) {
  res.render('about.ejs');
});

app.get('/contact', function(request, response) {
  response.render('contact.ejs');
});


app.get('/courses', function(request, response) {
  fs.readFile('courses.json', 'utf8', function(err, data) {
    var courses = JSON.parse(data);
    response.locals = { courses: courses };
    response.render('courses.ejs');
  });
});


app.get('/courses/:id', function(request, response) {
  fs.readFile('courses.json', 'utf8', function(err, data) {
    var coursesParsed = JSON.parse(data);
    var course = coursesParsed.filter( function(obj) {
      return obj.id === parseInt(request.params.id);
    });

    if (course.length)
      course = course[0];
    else
      course = null;

    response.locals = { course: course };
    response.render('course.ejs');
  });
});

app.listen(8000);



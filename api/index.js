var express = require('express')
var app = express()
var fs = require('fs')
app.get('/listCourses', function(req, res) {
    fs.readFile(__dirname + '/' + 'courses.json', 'utf8', function (err,data) {
        console.log( data )
        res.end( data )
    })
})
app.post('/addCourse', function (req, res) {
    fs.readFile( __dirname + "/" + "courses.json", 'utf8', function (err, data) {
       data = JSON.parse( data );
       data["course4"] = a;
       console.log( data );
       res.end( JSON.stringify(data));
    });
})
app.delete('/deleteCourse', function (req, res) {
    fs.readFile( __dirname + "/" + "courses.json", 'utf8', function (err, data) {
       data = JSON.parse( data );
       delete data["user" + 2];
        
       console.log( data );
       res.end( JSON.stringify(data));
    });
})
var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)
})
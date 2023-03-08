import express from "express";
import dotenv from 'dotenv';
dotenv.config()
var app = express();
import { createClient } from '@supabase/supabase-js'
const supabase = createClient('https://kfkztucvexligmiubppm.supabase.co', process.env.API)
app.get('/listCourses', async function(req, res) {
    const { data, error1 } = await supabase.from('Course').select()
    res.end(JSON.stringify(data))
})
app.get('/getCourse/:id', async function(req, res) {
    const {data, error} = await supabase.from('Course').select().eq('id',req.params.id)
    res.end(JSON.stringify(data))
})  
app.get('/searchCourses/:str', async function (req, res) {
    const {data, error} = await supabase.from('Course Group').select().ilike('name', '%' + req.params.str + '%')
    res.end(JSON.stringify(data))
})
app.get('/getCoursesInGroup/:id', async function(req, res) {
    const {data, error} = await supabase.from('Course').select().eq('group_id',req.params.id)
    res.end(JSON.stringify(data))
})
app.post('/addCourse', async function (req, res) {
    const {error} = await supabase.from('Course').insert({year:req.body.year, semester:req.body.semester, teacher:req.body.teacher, group_id:req.body.group_id})
})
app.put('/updateCourse', async function      (req, res) {
    const {error} = await supabase.from('Course').update({year:req.body.year, semester:req.body.semester, teacher:req.body.teacher, group_id:req.body.group_id}).eq('id',req.body.id)
})
app.delete('/deleteCourse/:id', async function (req, res) {
    const {error} = await supabase.from('Course').delete().eq('id',req.params.id)
    res.end(req.params.id)
})
app.get('/listCourseGroups', async function(req, res) {
    const { data, error1 } = await supabase.from('Course Group').select()
    res.end(JSON.stringify(data))
})
app.get('/getCourseGroup/:id', async function(req, res) {
    const {data, error} = await supabase.from('Course Group').select().eq('id',req.params.id)
    res.end(JSON.stringify(data))
})
app.post('/addCourseGroup', async function (req, res) {
    const {error} = await supabase.from('Course Group').insert({name:req.body.name})
})
app.put('/updateCourseGroup', async function (req, res) {
    const {error} = await supabase.from('Course Group').update({name:req.body.name}).eq('id',req.body.id)
})
app.delete('/deleteCourseGroup/:id', async function (req, res) {
    const {error} = await supabase.from('Course Group').delete().eq('id',req.params.id)
})
app.get('/listTags', async function(req, res) {
    const {data, error} = await supabase.from('Tags').select()
    res.end(JSON.stringify(data))
})
app.get('/getTag/:id', async function(req, res) {
    const {data, error} = await supabase.from('Tags').select().eq('id',req.params.id)
    res.end(JSON.stringify(data))
})
app.get('/getCoursesWithTag/:id', async function(req, res) {
    var {data, error} = await supabase.from('Course Tags').select().eq('tag_id',req.params.id)
    var oldData = JSON.parse(JSON.stringify(data))
    var courseData = []
    if(oldData != null) {
        for(var i=0;i<oldData.length;i++) {
            var {data, error} = await supabase.from('Course Group').select().eq('id',parseInt(oldData[i].group_id))
            var data2 = JSON.parse(JSON.stringify(data))
            if(data2 != null) {
                courseData.push(data2[0])
            }
        }
        res.end(JSON.stringify(courseData))
    }
})
app.post('/addTag', async function(req, res) {
    const {data, error} = await supabase.from('Tags').insert({name:req.body.name})
})
app.post('/addTagToCourse', async function(req, res) {
    const {data, error} = await supabase.from('Course Tags').insert({group_id:req.body.group_id, tag_id:req.body.tag_id})
})
app.get('/listAllComments', async function(req, res) {
    const { data, error1 } = await supabase.from('Comment').select()
    res.end(JSON.stringify(data))
})
app.get('/listComments/:id', async function(req, res) {
    const { data, error1 } = await supabase.from('Comment').select().eq('course_id',req.params.id)
    res.end(JSON.stringify(data))
})
app.get('/getComment/:id', async function(req, res) {
    const {data, error} = await supabase.from('Comment').select().eq('id',req.params.id)
    res.end(JSON.stringify(data))
})
app.post('/addComment', async function (req, res) {
    const {error} = await supabase.from('Comment').insert({message:req.body.message, student_id:req.body.student_id, course_id:req.body.course_id, parent_id:req.body.parent_id})
})
app.put('/updateComment', async function (req, res) {
    const {error} = await supabase.from('Comment').update({message:req.body.message, student_id:req.body.student_id, course_id:req.body.course_id, parent_id:req.body.parent_id}).eq('id',req.body.id)
})
app.delete('/deleteComment/:id', async function (req, res) {
    const {error} = await supabase.from('Comment').delete().eq('id',req.params.id)
})
app.get('/listRatings/:id', async function(req, res) {
    const {data, error} = await supabase.from('Rating').select().eq('course_id',req.params.id)
    res.end(JSON.stringify(data))
})
app.get('/getRating/:id', async function(req, res) {
    const {data, error} = await supabase.from('Rating').select().eq('id',req.params.id)
    res.end(JSON.stringify(data))
})
app.post('/addRating', async function (req, res) {
    const {error} = await supabase.from('Rating').insert({course_id:req.body.course_id, rating:req.body.rating, student_id:req.body.student_id})
})
app.put('/updateRating', async function (req, res) {
    const {error} = await supabase.from('Rating').update({course_id:req.body.course_id, rating:req.body.rating, student_id:req.body.student_id}).eq('id',req.body.id)
})
app.delete('/deleteRating/:id', async function (req, res) {
    const {error} = await supabase.from('Rating').delete().eq('id',req.params.id)
})
var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)
})
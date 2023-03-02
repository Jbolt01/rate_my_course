import express from "express";
import fs from "fs";
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
app.get('/getCoursesInGroup/:id', async function(req, res) {
    const {data, error} = await supabase.from('Course').select().eq('group_id',req.params.id)
    res.end(JSON.stringify(data))
})
app.post('/addCourse', async function (req, res) {
    const {error} = await supabase.from('Course').insert({year:req.body.year, semester:req.body.semester, teacher:req.body.teacher, group_id:req.body.group_id})
})
app.delete('/deleteCourse/:id', async function (req, res) {
    const {error} = await supabase.from('Course').delete().eq('id',req.params.id)
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
app.delete('/deleteCourseGroup/:id', async function (req, res) {
    const {error} = await supabase.from('Course Group').delete().eq('id',req.params.id)
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
app.delete('/deleteRating/:id', async function (req, res) {
    const {error} = await supabase.from('Rating').delete().eq('id',req.params.id)
})
var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)
})
const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

// Array
const courses = [
    {'id': 1, 'name': 'course_1'},
    {'id': 2, 'name': 'course_2'},
    {'id': 3, 'name': 'course_3'},
    {'id': 4, 'name': 'course_4'},
]

app.get('/', (req, res) => {
    res.send('hello world')
});

app.get('/api/courses', (req, res) => {
    res.send(courses)
});

app.post('/api/courses', (req, res) => {

    // Object distructuring
    // result.error or error
    const {error} = validateCourse(req.body);
    if(error) return res.status(404).send(error.details[0].message);

    // add item
    const course = {
        id: courses.length + 1,
        name: req.body.name
    }
    courses.push(course);
    res.send(course);
});

app.put('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send('The course with the given ID was not found...');

    // Object distructuring
    // result.error or error
    const {error} = validateCourse(req.body);
    if(error) return res.status(404).send(error.details[0].message);

    // update
    course.name = req.body.name;
    res.send(course);
});

app.delete('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send('The course with the given ID was not found...');

    // delete item
    const index = courses.indexOf(course);
    courses.splice(index, 1);

    res.send(course); 
});

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send('The course with the given ID was not found...');
    res.send(course);
});

// validation using #Joi
function validateCourse(course) {
    const schema = {
        name: Joi.string().min(3).required()
    }
    return Joi.validate(course, schema);
}

// PORT
const port = process.env.PORT || 3000

app.listen(port, () => 
    console.log(`Listening on port ${port}...`)
);


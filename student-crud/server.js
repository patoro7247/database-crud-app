var express = require('express');
var expressLayouts = require('express-ejs-layouts');
var db = require('./database/queries')


var bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({ extended: false })

var app = express();

app.set('view engine', 'ejs');


// setting express static directory as public, css will be a subfolder
app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'));

// setting the base layout of website as layout.ejs in layouts folder
app.use(expressLayouts);
app.set('layout', 'layouts/layout')

// sending GET request to localhost/ to render index.ejs
app.get('/', (req, res) => {
    res.render('index');
});


// gets list of students from db and loads them in a list for /students
// GET Renders list of all students in styled tables on /students

const callback = (studentList) => {
    app.get('/students', async (req,res) => {
    
        res.render('students.ejs', {studentList: studentList});
    });
    
};

// querying  students table in database to fill with list to pass
// to /students get request to be rendered in a styled table
const getStudents = () => {
    studentList = [];
    db.query('SELECT * FROM students ORDER BY id', (err, res) => {
    for(let i = 0; i < res.rows.length; i++) {
        studentList.push(res.rows[i]);
    }
    callback(studentList);
    })
};

getStudents();



// These functions are to view a single student on a /students/:id endpoint
// We query the students ID, the response is an object that holds all the students data, 
// which we load into an ejs file that we render

const getSpecificStudent = async (id) => {
    const specificStudent = {
        id: id,
        first_name : '',
        last_name : '',
        gender : '',
        gpa: 0.00
    }
    
    db.query('SELECT * FROM students WHERE id = $1',[id], (error, results) => {
        if(error){
            throw error;
        }
        specificStudent.first_name = results.rows[0].first_name,
        specificStudent.last_name = results.rows[0].last_name,
        specificStudent.gender = results.rows[0].gender,
        specificStudent.gpa = results.rows[0].gpa
    })
    
    return specificStudent;
}

app.get('/students/:id', async (req, res) => {
    const id = parseInt(req.params.id);

    const specificStudent = {
        id : id,
        first_name : studentList[id].first_name,
        last_name : studentList[id].last_name,
        gender : studentList[id].gender,
        gpa : studentList[id].gpa,
    }

    res.render('studentById.ejs', {specificStudent : specificStudent });
});




// Update student by ID
// First we render an ejs file that has a form with fields to update the student's name, gender, and gpa,,
// Then we send that form's POST request to /students/update endpoint where we query the user's ID on the database
// and update its values with the form's data from the POST request 
app.get('/students/update/:id', async(req, res) => {
    id = parseInt(req.params.id);
    res.render('updateStudent.ejs', {id: id});
});


// Returns success after form submit, updates 
app.post('/students/update', urlencodedParser, async(req, res) => {
    
    updatedStudent = req.body;
    updateStudent(updatedStudent);

    res.render('updateStudent-success.ejs', {data: req.body});
});

const updateStudent = (updatedStudent) => {
    db.query('UPDATE students SET first_name = $1, last_name = $2, gender = $3, gpa = $4 WHERE id = $5', [updatedStudent.first_name, updatedStudent.last_name, updatedStudent.gender, updatedStudent.gpa, updatedStudent.id],
    (error, results) => {
        if(error) {
            throw error
        }
        console.log('UPDATED USER')
    })
}

// PUT, update a student using '/students/:id' endpoint
app.get('/students/:id', async (req, res) => {
    const specificStudent = getSpecificStudent(parseInt(req.params.id));
    res.render('updateStudent.ejs');
});



// DELETE USER; When you click on delete, render a page with delete confirmation first
// The confirmation will send a POST request with the student's id, where the id will 
// be queried in the database and deleted.
app.get('/students/delete/:id', async (req, res) => {
    id = req.params.id;
    res.render('DeleteConfirmation.ejs', {id:id})
})

app.post('/students/delete', urlencodedParser, async(req, res) => {
    id = req.body.id;
    deleteStudent(id);
    res.render('DeleteConfirmation-success.ejs', {id: id})
});

const deleteStudent = (id) => {
    db.query('DELETE FROM students WHERE id = $1', [id],
    (error, results) => {
        if(error) {
            throw error
        }
        console.log('DELETED USER');
    })
}


// CREATE USER; When you click create user, render an ejs form to collect the new student's
// first name, last name, gender, and gpa, which will send a POST request to /createStudent/1
// which will receive a student object that will be queried into the database as an insertion
// into the table
app.get('/students/createStudent/1', async (req, res) => {
    
    res.render('createStudent.ejs')
})

app.post('/students/createStudent/1', urlencodedParser, async(req, res) => {
    const student = req.body;
    createStudent(student);
    res.render('createStudent-success.ejs', {student:student})
});

const createStudent = (student) => {
    db.query("SELECT COUNT(*) FROM students",  
    (error, results) => {
        if(error) {
            throw error
        }
        studentsLength = results.rows[0].count;
        id = parseInt(studentsLength) + 1;
        console.log(id);


        //const studentCount = parseInt(results) +1;
        db.query("INSERT INTO students (id, first_name, last_name, gender, gpa) VALUES ($1, $2, $3, $4, $5)", [id,student.first_name, student.last_name, student.gender, student.gpa],
            (error, results) => {
                if(error) {
                    throw error
                }
                console.log(`CREATED STUDENT id ${id}: ${student.first_name}, ${student.last_name}, ${student.gender}, ${student.gpa}`);
        })
    }) 

    
    
}


app.listen(process.env.PORT || 5080, () => console.log("Server running..."));
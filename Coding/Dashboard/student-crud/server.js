var express = require('express');
var expressLayouts = require('express-ejs-layouts');
var db = require('./database/queries')

console.log('testing')

var app = express();

app.set('view engine', 'ejs');


// setting express static directory as public, css will be a subfolder
app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'));


app.use(expressLayouts);
app.set('layout', 'layouts/layout')

app.get('/', (req, res) => {
    res.render('index');
});

studentList = [];

db.query('SELECT * FROM students', (err, res) => {
    

    for(let i = 0; i < res.rows.length; i++) {
        studentList.push(res.rows[i]);
    }
    

    
    
    
})

/*
studentList = [
    { id: 0,
    first_name: 'pat',
    last_name: 'h',
    gender: 'male',
    gpa: '3.87',
},
]
*/

//console.log(studentList.length);
app.get('/students', async (req,res) => {
    

    /*
    db.query('SELECT * FROM students', (err, resp) => {
       //console.log(resp);
    })*/
    
    res.render('students.ejs', {studentList: studentList});
    //we have list of students, now we need an ejs file named students.ejs, and pass our students list 
    //to students.ejs to format with a table
    
    
    // sending res.render to query 
    
});



function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
  }

async function demo() {
	await sleep(2000);
    console.log(db.studentList);
  

}

//demo();


app.listen(process.env.PORT || 5080, () => console.log("Server running..."));
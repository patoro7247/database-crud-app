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



app.get('/students', async (req,res) => {
    
    res.render('students.ejs', {studentList: studentList});
    
    
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
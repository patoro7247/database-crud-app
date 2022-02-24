# CRUD Single Page Student Administrator Panel

This is a admin panel made with Node, Express, and Postgres. 
This CRUD app used a PostgreSQL table to hold 50 students with random first names, last names, genders, and gpas sourced by mocakroo.com
This also is a Single Page Application which I think is a little more difficult than apps with traditional routing.
Clicking the Students link on the left sidebar will show you a queried list of students from the PostgreSQL database with
options to edit or delete each individual student, as well as an option to create a new student.
I tried to implement RESTful API's to perform CRUD operations on the database, but they ended up not very RESTful because I'm still
a little confused on asynchronous queries in RESTful APIs, if I didn't have to ping a database I think I could manage.

# Home Page
[![Admin-Panel-All-Students.png](https://i.postimg.cc/Cx2vGdWn/Admin-Panel-All-Students.png)](https://postimg.cc/3kgC7rr3)


# List of all students on PostgreSQL table

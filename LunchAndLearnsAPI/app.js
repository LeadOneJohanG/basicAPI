//Constants
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const { error } = require('console');
const PORT = process.env.PORT || 3000;
const app = express ();

app.use(bodyParser.json());

//Routes
//Home
app.get('/', (req, res) => {res.send('Welcome to Lunch and Learn API')});

//Developers list
app.get('/developers', (req, res) => {
    const query = 'Select * from users';
    connection.query(query, (error, results) => {
        if(error) throw error;
        if(results.length > 0) res.json(results);
        else res.send('No developer records on Database!');
    })
});

//Get developer
app.get('/developers/:id', (req, res) => {
    const {id} = req.params;
    const query = `Select * from users Where id = ${id}`;
    connection.query(query, (error, results) => {
        if(error) throw error;
        if(results.length > 0) res.json(results);
        else res.send(`No record related with ${id} id`);
    })
});

//Add developer
app.post('/developers/add', (req, res) => {
    const { name, lastname, email } = req.body;
    const query = `Insert into users (name, lastname, email) values ('${name}', '${lastname}', '${email}')`;
    connection.query(query, (error, results) => {
        if(error) throw error;
        res.send(`user with email: ${email} created succesfully!`)
    })
});

//Update developer
app.put('/developers/:id', (req, res) => {
    const { id } = req.params;
    const { email } = req.body;
    const query = `Update users Set email = '${email}' Where id = '${id}'`;
    connection.query(query, (error) => {
        if(error) throw error;
        res.send(`New Email: ${email} updated for user with id: ${id}`);
    })
});

//Delete developer
app.delete('/developers/:id', (req, res) => {
    const { id } = req.params;;
    const query = `Delete from users where id = '${id}'`;
    connection.query(query, (error, results) => {
        if(error) throw error;
        if(results.affectedRows == 0){
            res.send(`No user found for id: ${id}`);
            return;}
        res.send(`User with id: ${id} deleted from the Database`);
    }) 
});

//Mysql
const connection = mysql.createConnection({host: 'localhost', user: 'root', password: '123456', database: 'developers'})

//Check connection 
connection.connect(error => {
    if(error) throw error;
    console.log(`Developers database running!`);
});

app.listen(PORT, () => console.log(`Lunch and Learn API running on PORT: ${PORT}`));

const express = require('express')
const app = express()
const port = 3000

const config = {
    host: 'mysql',
    user: 'root',
    password: 'root',
    database: 'nodedb'
}

const mysql = require('mysql')


var connection = mysql.createConnection(config)
//insert person
const insertsql = `INSERT INTO people(name) values('Wesley')`
connection.query(insertsql)
connection.end()


function getPeople(callback) {
    console.log('calling get people')
    let  response = '<h1>Full Cycle Rocks!</h1>'
    // get person
    var connection = mysql.createConnection(config)
    const getsql = ` Select name from people`
    connection = mysql.createConnection(config)
    connection.query(getsql, function (err, result, fields) {
        if (err) throw err;
        response = response + '<br/><ul>'
        console.log(response);
        for (i in result) {
            response = response + "<li>" + result[i].name + "</li>"
        }
        response = response + "</ul><br/>"

        callback(response);
    });
    
    connection.end();
};


app.get('/', (req, resp) => {
    getPeople(function(people){
        resp.send(people);
    });
})

app.listen(port, () => {
    console.log('rodando na porta ' + port)
})
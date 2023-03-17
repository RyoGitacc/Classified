import mysql from 'mysql'

// const db =mysql.createConnection({
//     host:"us-cdbr-east-06.cleardb.net",
//     user:"b81bcd5c77f9a5",
//     password:"5f00c76c",
//     database:"heroku_07610c7a1f3e20f",
//     multipleStatements: true
// })

const db =mysql.createPool({                 // use createPool to handle disconnection
    host:"us-cdbr-east-06.cleardb.net",
    user:"b81bcd5c77f9a5",
    password:"5f00c76c",
    database:"heroku_07610c7a1f3e20f",
    multipleStatements: true
})

db.query('select 1 + 1', (err, rows) => { /* */ });


export default db;

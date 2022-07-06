import mysql from 'mysql2/promise';

const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'library',
    password: 'bit',
    database: 'library'
})

export default connection;
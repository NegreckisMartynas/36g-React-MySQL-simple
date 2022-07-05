import mysql from 'mysql2/promise';

const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'library',
    password: 'bit',
    database: 'library'
})

export default async function handler(req, response) {
    const [result, fields] = await connection.query('SELECT * FROM view_book LIMIT 10');
    response.status(200).json(result)
}
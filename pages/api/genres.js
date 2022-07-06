import mysql from 'mysql2/promise';
import connection from '../../utility/connection';

export default async function handler(req, response) {
    const [result, fields] = await connection.query('SELECT g.genre_id, name, count(b.book_id) as books_count FROM genre g LEFT JOIN book b ON g.genre_id = b.genre_id GROUP BY g.genre_id;');
    response.status(200).json(result)
}
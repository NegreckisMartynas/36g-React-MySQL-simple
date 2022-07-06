import mysql from 'mysql2/promise';
import connection from '../../utility/connection';

export default async function handler(req, response) {
    const page = req.query.page ?? 1;
    const limit = 10;
    const offset = (page -1 ) * limit
    const [result, fields] = await connection.query('select * from view_author LIMIT ? OFFSET ?;', 
                                                    [limit, offset]);
    response.status(200).json(groupById(result))
}

function groupById(arr) {
    return arr.map(row => { return {
                            author_id: row.author_id, 
                            name: row.name, 
                            books: (JSON.parse(row.author_titles))
                        }})
}
import mysql from 'mysql2/promise';

const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'library',
    password: 'bit',
    database: 'library'
})

export default async function handler(req, response) {
    const [result, fields] = await connection.query('SELECT a.author_id, name, title  FROM author a LEFT JOIN book_author ba ON a.author_id = ba.author_id LEFT JOIN book b ON b.book_id = ba.book_id LIMIT 50');
    console.log(groupById(result));
    response.status(200).json(groupById(result))
}

function groupById(arr) {
    const result = new Map()
    for (const row of arr) {
        let group;
        if(result.has(row.author_id)){ //if group exists, modify it
            group = result.get(row.author_id);
        }
        else { //if not, create and insert
            group = {author_id: row.author_id, name: row.name, books: []}
            result.set(row.author_id, group);
        }
        group.books.push(row.title);
    }
    return Array.from(result.values());
}
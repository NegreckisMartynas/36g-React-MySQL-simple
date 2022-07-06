import connection from '../../utility/connection';

export default async function handler(req, response) {
    const page = req.query.page ?? 1;
    const [result, fields] = 
        await connection.query('SELECT * FROM view_book LIMIT ? OFFSET ?', [10, (page-1)*10]);
    response.status(200).json(result)
}
import connection from '../../../utility/connection';

export default async function handler(req, response) {
    const book_id = req.body;
    const result = await connection.query('DELETE FROM book WHERE book_id=?',[book_id])
    console.log(result)
    response.status(200).json()
}
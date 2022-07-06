import connection from '../../../utility/connection';

export default async function handler(req, response) {
    const body = JSON.parse(req.body);
    console.log('Body:', body.title)
    const result = await connection.query('UPDATE book SET title=?, release_year=? WHERE book_id=?',[body.title, body.release_year, body.book_id])
    console.log(result)
    response.status(200).json()
}
import connection from "../../utility/connection";

export default function handler(req, res) {
    let response = {}
    //Grazinti knygas, kuriu genre_id = 38
    //Jei padaret, padarykit, kad butu galima nurodyti genre_id per URL parametra ( /api/books-genre?genre=10 )
    res.status(200).json(response);
}
  
import connection from "../../utility/connection";

export default async function handler(req, res) {
    const token = req.cookies.accessToken;//b8008c7d-df24-4bbb-a5c4-c8d14d1fbc4e
    if(!token) {
        res.status(400).json();
        return
    }
    //jei token egzistuoja DB, grazinti 200
    //access_token_id; token; user_id
    //1,b8008c7d-df24-4bbb-a5c4-c8d14d1fbc4e,1
    const [data, fields] = await connection.query('SELECT user_id FROM access_token WHERE token = ?', [token]);
    const userId = data[0]?.user_id;
    const tokenExists = userId != null;
    if(tokenExists){
        res.status(200).json();
    }
    //jei ne, grazinti 400
    else {
        res.status(400).json();
    }
  }
  
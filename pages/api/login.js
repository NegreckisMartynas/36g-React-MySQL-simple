import bcrypt from 'bcrypt';
import {v4 as uuidv4} from 'uuid'
import connection from '../../utility/connection'

export default async function handler(req, res) {
    const body = JSON.parse(req.body);
    //const hash = bcrypt.hash(body.password, 12);
    console.log(body);
    const [data, fields] = await connection.query('SELECT user_id, passwordHash FROM user WHERE email=?', 
                                                [body.email]);
    const user = data[0];
    const hash = user?.passwordHash ?? '';
    //patikrinti ar prisijungimas teisingas
    if(await bcrypt.compare(body.password,hash)){
        const token = uuidv4()
        await connection.query('INSERT INTO access_token(user_id, token) VALUES(?,?)', [user.user_id, token])
        //grazinti 200+token
        res.status(200).json({token: token})
    }
    else{
        //grazinti 400
        console.log('No match')
    }                                                

    // res.status(200).json({ token: '12345' })
    res.status(400).json({})
}
  
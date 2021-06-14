const jwt = require('jsonwebtoken');


const auth = async (req:any, res:any, next:any) => {
    const token = req.headers['authorization'].split(' ')['1'];
    const result = jwt.verify(token, 'somesecretkey');
    req.online = result
    next()
}

export default auth;
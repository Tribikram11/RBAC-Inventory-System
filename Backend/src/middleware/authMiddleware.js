const jwt = require('jsonwebtoken')

function authMiddleware(req, res, next){
    const authHeader = req.headers.authorization

    if(!authHeader  || !authHeader.startsWith("Bearer ")){
        return  res.json({msg:"not authorized"})
    }

    const token = authHeader.split(" ")[1]
    try{
        const decodedPayload = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decodedPayload 
        next();
    }
    catch(err){
        return res.json({msg: "invalid token"})
    }

}

module.exports = authMiddleware;
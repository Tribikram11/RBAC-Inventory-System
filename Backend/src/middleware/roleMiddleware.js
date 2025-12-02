roles = ["admin", "manager", "viewer"]

function roleMiddleware(roles){
    return (req, res, next) => {
        if(!req.user){
            return res.status(401).json({msg : "access denied"})

        }
        const userRole = req.user.role

        if(roles.includes(userRole)){
            next()
        }else{
            return res.status(401).json({msg : "access denied"})
        }
    }
}

module.exports = roleMiddleware;
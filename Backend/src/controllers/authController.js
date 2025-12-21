const User = require('../models/user')
const generateToken = require('../utils/generateToken')

const login = async (req, res) => {
    const { email, password } = req.body;

    if (!(email || password)) {
        return res.status(400).json({
            msg: "invalid credentials"
        })
    }
    try {
        const checkUser = await User.findOne({ email })

        if (!checkUser) {
            return res.status(401).json({
                msg: "user does not exist"
            })
        }

        const verifyPass = await checkUser.matchPassword(password)

        if (!verifyPass) {
            return res.status(401).json({
                msg: "wrong password"
            })
        }

        const token = generateToken(checkUser);

        res.json({
            msg: "login successful",
            token,
            checkUser: {
                id: checkUser._id,
                name: checkUser.name,
                email: checkUser.email,
                role: checkUser.role
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Server error" });
    }


    
}

// register route
const register = async(req, res) => {
    const {name, email, password, role}= req.body;

    if(!name || !email || !password){
        return res.status(400).json({
            msg: "enter required fields"
        })
    }

    try{

        const findUser = await User.findOne({email})

        if(findUser){
            return res.json({
                msg:"user exist"
            })
        }
        const newUser = new User({
            name,
            email, 
            password,
            role: role || "viewer"
        })

        await newUser.save();


        res.status(200).json({
            msg:"new user created",
            user: {
                id: newUser._id,
                email: newUser.email,
                role: newUser.role
            }
        })

    }catch(err){
        console.log(err)
        res.status(500).json({
            msg: 'server error'  
        })
    }

}


 module.exports = {login, register};
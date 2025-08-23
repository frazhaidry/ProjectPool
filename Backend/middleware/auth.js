const jwt = require("jsonwebtoken");
const User = require("../models/User");


const userAuth = async(req, res, next) => {
    // Read the token from the req cookies
    try {
        const cookies = req.cookies;

        const {token} = cookies;
        if(!token){
            return res.status(401).send("Please Login!")
        }
    
        const decodedObj = await jwt.verify(token, process.env.JWT_SECRET);
    
        const {_id} = decodedObj; 
    
        const user = await User.findById(_id);
        if(!user){
            throw new Error("User not found");
        }
        req.user = user;
        next();

    } catch (error) {
        res.status(400).send("ERROR: "+ error.message);
    }

} 

module.exports = {
    userAuth
}
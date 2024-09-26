// require('dotenv').config(); == install dotenv

const jwt = require('jsonwebtoken');
const JWT_SECRET = '58UHJ59IUIROjfgjktr9uidhdfjtr89etuhdfjdftuhdujldgjkglde8';
// function to generate jwt token 

const generateToken = (userId) => {
    return jwt.sign({ userId }, JWT_SECRET, {
        expiresIn: '1h'});
};

function setCookieToken(res, token, cookie_name = 'jwt') {
    //set the maximium age for the cookie (1 hour)
    const maxAge = 1 * 60 * 60 * 1000; //1 hour in milliseconds
    res.cookie(cookie_name, token, {
        maxAge: maxAge, //set the maxAge property
        httpOnly: true, //only accessible via HTTP, not javascript
        sameSite: 'strict' // Resrict cookie to same site to prevent CSRF(CROSS SITE )
    })
}

// middleware for protecting against unathorized user 
const verifyToken = (req, res, next) => {
    try {
        const token = req.headers.cookie?.split(";").find(row => row.startsWith('jwt=')).split('=')[1]
        if (!token ||token.length < 10) {
            // taken user back to login page 
            return res.redirect('/');
        }
        const decode = jwt.verify(token, /*process.env.*/JWT_SECRET); //Verify token signature 
        const user =decode.userId // Extract user information from token 
        console.log('USER INFO EXTRACTEED FROM TOKEN')
        console.log(user)
        req.user = user; //Attach user object to request
        next(); //Allow access if valid
    }catch (error) {
        console.log(error.message);
        if(error.message == "jwt expired"){
         //do sth likr telling the user they have to resign in to account session expired 
         return res.status(403).json({message:"Your session already expired"}) 
        }
        return res.redirect("/")
        // res.status(403).json({error:"Forbidden"}); Handle invalid tokens
    }
    
};

module.exports ={
    generateToken,
    verifyToken,
    setCookieToken
};
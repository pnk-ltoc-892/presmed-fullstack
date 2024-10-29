import jwt from 'jsonwebtoken'


const userAuth = async (req, res, next) => {
    try {        
        const { token } = req.headers
        if(!token){
            return res.json({
                success: false,
                message: "Not Authorized"
            })
        }
        // ! Token Verification ? Get into Details
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
        req.body.userId = decodedToken.id
        next()
    } 
    catch (error) {
        console.log("Error While User Authentication: ", error);
        return res.json({
            success: false,
            Error: error
        })
    }
}

export { userAuth }
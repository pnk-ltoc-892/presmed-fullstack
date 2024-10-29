import jwt from 'jsonwebtoken'


const adminAuth = async (req, res, next) => {
    try {
        const { token } = req.headers
        
        if(!token){
            return res.json({
                success: false,
                message: "Not Authorized"
            })
        }
        const decodedToken = await jwt.verify(token, process.env.JWT_SECRET)
        // console.log(decodedToken);
        
        if(decodedToken !== process.env.ADMIN_PASSWORD + process.env.ADMIN_EMAIL){
            return res.json({
                success: false,
                message: "Invalid Ceredentials"
            })
        }
        next()
    } 
    catch (error) {
        console.log("Error While Admin Authentication: ", error);
        return res.json({
            success: false,
            Error: error
        })
    }
}

export { adminAuth }
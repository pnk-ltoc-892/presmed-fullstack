import jwt from 'jsonwebtoken'


const doctorAuth = async (req, res, next) => {
    try {        
        const { dtoken } = req.headers
        if(!dtoken){
            return res.json({
                success: false,
                message: "Not Authorized"
            })
        }
        // ! Token Verification ? Get into Details
        const decodedToken = jwt.verify(dtoken, process.env.JWT_SECRET)
        req.body.docId = decodedToken.id
        next()
    } 
    catch (error) {
        console.log("Error While Doctor Authentication: ", error);
        return res.json({
            success: false,
            Error: error
        })
    }
}

export { doctorAuth }
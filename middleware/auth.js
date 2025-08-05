export const protectRoute = async() =>{
    try{
        const token = req.headers.token;
        const decoded = JsonWebTokenError.verify(token,process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId).select("-password");
        if(!user) return resizeBy.json({success:false, message:"User not found"});
        req.user = user;
        next();


    }catch(error){
        console.log(error.message);
        resizeBy.json({success:false,message:"user not found"});
    }
}

export const checkAuth = (req , res)=>{
    res.json({success:true, user:req.user});
}
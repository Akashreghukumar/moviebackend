const jwt =require('jsonwebtoken');

exports.Authorize=async(req,res,next)=>{


    //check access token in header
    if(!req.headers['access-token'])
    return res.status(401).send({msg:"unauthorized"})


    try{
        //verify the correct token
        req.body.user=await jwt.verify(req.headers['access-token'],"CODE");
        next();

    }
    catch(err){
        res.status(401).send({msg:"unauth"})

    }

    // exports.isadmin=async(req,res,next)=>{
    //     req.body.user.role=="admin"? next():res.status(401).send({msg:"not an admin"})
    // }






}



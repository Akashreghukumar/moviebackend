const { ObjectId } = require('mongodb');
const mongo=require('../shared/connection');


module.exports.createuser=async (req,res,next)=>{

    try{
        var data=await mongo.db.collection("user").insertOne(req.body);
        res.send(data);
        console.log('created')

    }
    catch(err)
    {
        console.log(err)
        res.status(500).send(err)
    }
} 


module.exports.getuser=async (req,res,next)=>{

    try{
        var data=await mongo.db.collection("user").findOne({_id: ObjectId(req.params.id)})

    }
    catch(err)
    {
        console.log(err)
        res.status(500).send(err)
    }
} 
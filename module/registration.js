const { ObjectId } = require('mongodb');
// const mongo=require('../shared/connect');
const User=require('../models/user');
const Joi=require('joi');
const { application } = require('express');

const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')



exports.signup=async(req,res,next)=>{
    const schema=Joi.object({
        username:Joi.string().min(4).max(15).required(),
        email:Joi.string().email().required(),
        password:Joi.string().min(5).max(15).required()
    })

    const {error}=await schema.validate(req.body);
    if(error) return res.status(400).send({msg:error.details[0].message})
    
  //check email exist
   const existuser = await User.findOne({"email":req.body.email}).exec();
   if(existuser) return res.status(400).send({msg:"email already exist"});

  //encrypt password

  const random=await bcrypt.genSalt(10);
 req.body.password= await bcrypt.hash(req.body.password,random)
 
   //save in db
//    var data=await mongo.db.collection('user').insertOne(req.body);
//    res.send(data)

const user=new User({
    username:req.body.username,
    email:req.body.email,
    password:req.body.password
})
var response=await user.save();
res.send(response)

}


exports.signin=async(req,res,next)=>{

    const schema=Joi.object({
       
        email:Joi.string().email().required(),
        password:Joi.string().min(5).max(15).required()
    })

    const {error}=await schema.validate(req.body);
    if(error) return res.status(400).send({msg:error.details[0].message})
    
  //check email exist
   const existuser = await User.findOne({"email":req.body.email}).exec();
   if(!existuser) return res.status(400).send({msg:"user not exist"});

  //password valid
  const isvalid=await bcrypt.compare(req.body.password,existuser.password)
  if(!isvalid) return res.status(400).send({msg:"invalid password"})

  //generate token
 // const token=jwt.sign(existuser.JSON(),"CODE")
    const token=jwt.sign(existuser.toJSON(),"CODE")
  res.send(token)

}

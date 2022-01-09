var express=require("express")
var router=express.Router();
var userModule=require('../module/usermodule');

// router.get("/get",registrationModule.getuser);
router.post("/create",userModule.createuser);
router.get('/get',userModule.getuser);

module.exports=router;
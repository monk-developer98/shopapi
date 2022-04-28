const router = require("express").Router();
const User = require("../modals/User");
const CryptoJS = require("crypto-js");
const jwt  = require("jsonwebtoken");

router.post("/register",async(req,res)=>{
    const newUser =  new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SECRET).toString(),
    });
    try {
        const savedUser = await newUser.save();
        res.status(201).send(savedUser)   
    } catch (error) {
        res.status(500).send(error)
    }
})

router.post("/login", async(req,res)=>{
    try {
        const user = await User.findOne({username:req.body.username});

        !user && res.status(401).send("Wrong Credentials!")
        
        const hashPass = CryptoJS.AES.decrypt(user.password, process.env.PASS_SECRET) 
        const  OrgPassword = hashPass.toString(CryptoJS.enc.Utf8);

        OrgPassword !== req.body.password && res.status(401).send("Wrong Credentials")

        const accessToken = jwt.sign({
            id:user._id,
            isAdmin:user.isAdmin,
        }, process.env.JWT_SEC,
        {expiresIn:"3d"}
        )

        const { password , ...others } = user._doc;

        res.status(200).json({...others, accessToken})

    } catch (error) {
        console.log(error);
    }
})


module.exports = router; 
const User = require("../modals/User");
const { verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifytoken");

const router = require("express").Router();

router.put("/:id", verifyTokenAndAuthorization, async(req,res)=>{
    if(req.body.password){
        req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SECRET).toString()
    }
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id,{
            $set: req.body
        },{new:true}
        );
        res.status(200).json(updatedUser)
    } catch (error) {
            res.status(500).json(error)
    }
})

router.delete("/:id", verifyTokenAndAuthorization, async(req,res)=>{
    try {
        await User.findByIdAndDelete(req,params.id)
        res.status(200).json("User has been deleted...")
    } catch (error) {
        res.status(500).json(error)
    }
})

router.get("/find/:id", verifyTokenAndAdmin, async(req,res)=>{
    try {
        const user =  await User.findById(req.params.id);

        const { password , ...others } = user._doc;
        res.status(200).json(others)
    } catch (error) {
        res.status(500).json(error)
    }
})
router.get("/", verifyTokenAndAdmin, async(req,res)=>{
    try {
        const users =  await User.find();
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router;
const User = require("../models/userModel.model.js");
const bcrypt = require("bcrypt");


module.exports.signUp= async(req,res,next)=>{
   try {
    
    const  {username,email,password}=req.body;

    const usernameCheck = await User.findOne({username});
    if(usernameCheck)
    return res.json({msg:"Username already uses",status:false});

    const emailCheck = await User.findOne({email});
    if(emailCheck)
    return res.json({msg:"Email already used",status:false})

 
    const hashedPassword = await bcrypt.hash(password,5);

    const user = await User.create({
        username,
        email,
        password:hashedPassword,
    });
    delete user.password;

    return res.json({status:true,user});

   } catch (error) {
    next(error);
   }
};

module.exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
  
    const user = await User.findOne({ username });
    if (!user)
      return res.json({ msg: "Incorrect Username or Password", status: false });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.json({ msg: "Incorrect Username or Password", status: false });

    delete user.password;

    return res.json({ status: true, user });

  } catch (ex) {
    next(ex);
  }
};


module.exports.logout=async(req,res,next)=>{
  try {
 
    const { userId } = req.body;
    const userData = await User.findByIdAndUpdate(
      userId,
      {
        online:false
      },
      { new: true }
    );
    
    return res.json({
      isSet: userData.online,
      
    });
  } catch (error) {
    next(error)
  }
}
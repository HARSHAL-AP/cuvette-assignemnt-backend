const jwt=require("jsonwebtoken");


const userauthonticate=(req,res,next)=> {
    const token=req.headers.authorization
    if(token){
      const decode=jwt.verify(token,masai)
      if(decode){
          const userId=decode.userId
          console.log(decode)
          req.body.userId=userId
          next()
      }
      else{
        return res.status(401).send({ message: 'Unauthorized Acsess' });
      }
    }
    else{
      return res.status(401).send({ message: 'Unauthorized Acsess' });
    }
  }


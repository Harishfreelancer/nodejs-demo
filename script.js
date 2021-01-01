let jwt = require("jsonwebtoken");
let express = require("express");
let bodyParser = require("body-parser");
let port = process.env | 7000;

let app = express();
app.use(bodyParser.urlencoded({extended:false}));

app.get("/",function(req,res){
    res.send("works")
})
console.log("heelo")

app.post("/login",(req,res)=>{
    const user = {
        email:"harish@gmail.com",
        password:"12345"
    }
    jwt.sign({user},"secretKey",(err,token)=>{
        res.send(token)
    })
})
app.post("/post",verifyToken,function(req,res){
    jwt.verify(req.token,"secretKey",(err,auth)=>{
        if(err)res.sendStatus(403)
        res.send(auth)
    })
})

app.listen(port,()=>{
    console.log(`server listening at ${port}`)
})
console.log("hello")
function verifyToken(req,res,next){
  const token = req.headers["Authentication"];
  console.log(token)
  if(typeof token !== undefined){
      req.token = token;
      next()
  }else{
      res.sendStatus(403)
  }    
}
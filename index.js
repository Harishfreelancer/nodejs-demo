const express = require('express');
// const ejs = require('ejs');
const bodyParser = require('body-parser');
const mailer = require("nodemailer");
let app = express();


app.set('view engine',"ejs");
app.use(bodyParser.urlencoded({ extended:false }));
// app.use(bodyParser.json());
console.log("hello")


let user_email="",user_password="",toEmail="",subject="",html="";
let work = false;   
app.get('/',function(req,res){
    res.render('home');
})
app.post('/form',function(req,res){
    let {email,password} = req.body;    
    user_email+=email.toString();
    user_password+=password.toString();
    res.render("email",{name:req.body.name})
    console.log(user_email,user_password)
})
app.post("/sent",(req,res)=>{
    let {reciver_email,subject,html} = req.body;
    toEmail+=reciver_email.toString()
    subject+=subject.toString();
    html+=html.toString();
    let transport = mailer.createTransport({
        service:"gmail",
        auth:{
            user:user_email,
            pass:user_password
        }
    })
    let options = {
        from:user_email,
        to:toEmail,
        subject:subject,
        html:html
    }
    transport.sendMail(options, function(err){
        if(err)throw err;
        console.log("email sent!")
    })

    res.render("sent",{email:req.body.reciver_email})
})
app.listen(9000,()=>{
    console.log("Listening");
})

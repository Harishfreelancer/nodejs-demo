let bodyParser = require("body-parser");
let urlEncoded = bodyParser.urlencoded({extended:false});

let data = [
    {id:0,item:"Item-1"},
    {id:1,item:"Item-2"},
    {id:2,item:"Item-3"},
    {id:3,item:"Item-4"},
]

module.exports = function(app){
    app.get("/",urlEncoded,(req,res)=>{
            res.render("todo",{item:data});
    })
    app.post("/",urlEncoded,(req,res)=>{
        data.push(req.body)
        res.json(data);
    })
    app.delete("/:id",(req,res)=>{
        console.log(req.param.id)
    })
}
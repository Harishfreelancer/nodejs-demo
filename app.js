const express = require("express");
const app = express();
const ejs = require("ejs");
const todo = require("./controllers/todo");
app.set("view engine","ejs");
todo(app);

app.listen(9000,()=>console.log("listening in 9000"));
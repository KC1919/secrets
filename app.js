//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const ejs = require("ejs");
const mongoose=require("mongoose");

mongoose.connect("mongodb://localhost:27017/userDB",{useNewUrlParser:true, useUnifiedtopology:true});

const Schema=mongoose.Schema;

const userSchema=new Schema({
  email:{type:String,required:true},
  password:{type:String,required:true}
});

const User=mongoose.model("User",userSchema);

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));


app.get("/",(req,res)=>{
  res.render("home");
})

app.get("/login",(req,res)=>{
  res.render("login");
})

app.get("/register",(req,res)=>{
  res.render("register");
})

app.post("/register",(req,res)=>{
  let email=req.body.username;
  let password=req.body.password;

  const user=new User({
    email:email,
    password:password
  });
  user.save();

  res.redirect("/login")
});

app.post("/login",(req,res)=>{

  let username=req.body.username;
  let password=req.body.password;

  User.findOne({email:username},function(err,foundUser){

    if(!foundUser)
    {
      res.redirect("/register");
    }
    else{
      if(foundUser.password===password)
      {
        res.render("secrets");
      }
      else{
        res.send("Incorrect Password");
      }
    }
  });
});













app.listen(3000, function(err) {
  if (err)
    console.log(err);
  else
    console.log("Listening on port 3000");
});

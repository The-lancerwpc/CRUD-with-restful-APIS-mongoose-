const express=require("express");
const aap=express();
const mongoose=require("mongoose");
const path = require("path");
const methodoverride = require("method-override");

//requiring schema which is in models folder
const chat=require("./models/chat.js");

aap.set("views",path.join(__dirname,"views"))//views folder path set
aap.set("view engine","ejs");
aap.use(express.static(path.join(__dirname,"public")));
//to parse data from http link post request we use urlencoded:true
aap.use(express.urlencoded({extended:true}));
aap.use(methodoverride("_method"));

//connection setup
//caling main
main()
.then(()=>{console.log("connection successful")})
.catch(err => console.log(err));

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/chat')
}
//run once
// let chat1= new chat({
//     from:"ss",
//     to:"sid",
//     msg:"hii",
//     created_at: new Date()//date constructor that randomly returns date n UTC format time

// });
// chat1.save().then((res)=>{
//     console.log(res);
// });

//index route
//using async as it have to wait till data is not received from db
aap.get("/chats",async(req,res)=>{
    let chats = await chat.find();
    console.log(chats);
    
    res.render("index.ejs",{chats});
});
aap.post("/chats",(req,res)=>{
let{from,to,msg}=req.body;
let newchat = new chat({
    from:from,
    to:to,
    msg:msg,
    created_at:new Date()
})
console.log(newchat);
newchat.save()
.then((res)=>{
    console.log("saved succefully");
})
.catch((err)=>{
    console.log(err);
});
//res.send("working");
res.redirect("/chats");//redirect to home page
});

//create new
aap.get("/chats/new",(req,res)=>{
    //res.send("root is working");\
    res.render("new.ejs")
});

//edit route
aap.get("/chats/:id/edit",async(req,res)=>{
    let{id}=req.params;
    let chatss = await chat.findById(id);
    
    res.render("edit.ejs",{chatss});
});

//update route
aap.put("/chats/:id",async(req,res)=>{
    let{id}=req.params;
    let{newmsg}=req.body;
    let updatechat = await chat.findByIdAndUpdate(

        id,
        {msg:newmsg},
        {runValidators:true,new:true}
    );
    console.log(updatechat);
    res.redirect("/chats");
   
});


//delete route
aap.delete("/chats/:id",async(req,res)=>{
    let{id}=req.params;
    let deletedchat = await chat.findByIdAndDelete(id);
console.log(deletedchat);
res.redirect("/chats"); 

})

aap.get("/",(req,res)=>{
res.send("root is working");
});

aap.listen(8080,()=>{
    console.log("server is listening on port 8080")
})
const mongoose=require("mongoose");
const chat = require("./models/chat.js");
//connection setup
//caling main
main()
.then(()=>{console.log("connection successful")})
.catch(err => console.log(err));

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/chat')
}

chat.insertMany([
   { from:"ss",
    to:"sid",
    msg:"hii",
    created_at: new Date()//date constructor that randomly returns date n UTC format time
    },
    { from:"ssjhj",
    to:"sid",
    msg:"hiijhghj",
    created_at: new Date()//date constructor that randomly returns date n UTC format time
    },
    { from:"ssjgg",
    to:"sid",
    msg:"hiijhgjhg",
    created_at: new Date()//date constructor that randomly returns date n UTC format time
    },
    { from:"ssjhgh",
    to:"sid",
    msg:"hiivhjvh",
    created_at: new Date()//date constructor that randomly returns date n UTC format time
    },
]);
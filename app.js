//jshint esversion:8

const express=require('express');
const bodyParser=require('body-parser');
const mongoose =require('mongoose');
const mongo=require('./models/User');
const socket = require('socket.io');
const ejs = require("ejs");
var nodemailer=require('nodemailer');


mongoose.connect('mongodb://localhost:27017/userdb', {useNewUrlParser: true, useUnifiedTopology: true });

const app=express();
app.use(bodyParser.json());
app.use(express.static('./public'));

const server = app.listen(3000, () => {
    console.log('listening to port 3000');
})

const io = socket(server);

app.set("view engine","ejs");

app.use(express.static('public'));

app.post('/data',async (req,res)=>{
    console.log(req.body)
    const user=new mongo.User({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password
    }).save().then(data=>res.json(data))
})
app.post('/sign',async(req,res)=>{
console.log(req.body)
const user=await mongo.User.findOne({email:req.body.email});
if(user.password==req.body.password){
    console.log('u correct')
}
else{
    console.log('incorrect password');
}
})

app.post('/question',async(req,res)=>{
    // const pers=await mongo.User.findOne({_id:req.body.item})
    const hell=req.body.item;
    const jj=JSON.parse(hell)
    console.log(jj)
    const msg=new mongo.Forum({
        question:req.body.question,

        person:await mongo.User.findOne({_id:jj._id})
    }).save().then(data=>res.send(data))
})

app.get('/click/:id',async(req,res)=>{
console.log(req.params.id)
const user=await mongo.Forum.findOne({_id:req.params.id});
console.log(user)
})
app.get('/like/:data',async(req,res)=>{
    console.log(req.body.data)
})

app.post('/ans',async(req,res)=>{
    const hell=req.body.item;
    const jj=JSON.parse(hell)
    console.log(jj)
    console.log(req.body.item);
    mongo.Forum.updateOne({_id:req.body.id}, {$push: {"answer":  {"handle":`${jj.name}`,"msg":`${req.body.ans}`}}}, function(err, numAffected, rawResponse) {
        console.log(err)
        console.log('The number of updated documents was %d', numAffected);
        console.log('The raw response from Mongo was ', rawResponse);
    });
})

app.get('/qs',async(req,res)=>{
    mongo.Forum.find({}).then(data=>res.send(data))
})




let name;
let toWhom;
let inid;
let toid;

app.post("/chat", async(req, res) => {
    // Finding from db if the user is present 
    const init=await mongo.User.findOne({name:req.body.initiator});
    const to=await mongo.User.findOne({name:req.body.to});
    const ini=await mongo.Message.findOne({initiator:init._id,to:to._id});
    const ini2=await mongo.Message.findOne({initiator:to._id,to:init._id});
    
    if(ini){
        // console.log('u der dude');
        name=req.body.initiator;
        toWhom=req.body.to;
        res.send(ini.message)
        inid=init._id;
        toid=to._id
    }
    else if(ini2){
        // console.log('u are also der dude');
        name=req.body.to;
        toWhom=req.body.initiator;
        res.send(ini2.message)
        inid=to._id;
        toid=init._id
    }
    else{
        // Creating new user if user not found in db
        const newUser=new mongo.Message({
            initiator:await mongo.User.findOne({name:req.body.initiator}),
            to:await mongo.User.findOne({name:req.body.to})
        }).save().then(data=>{
            console.log(data);
            res.send(data);
        }).catch(e=>console.log(e))
        name=req.body.initiator;
        toWhom=req.body.to; 
    }
});

// To display the previous chats 
app.get("/ret", async(req, res) => {

    const data=await mongo.Message.findOne({initiator:inid,to:toid});
    console.log(data.message)
    res.send(data.message)
})

// Socket Code
io.on('connection', (socket) => {
    console.log(`connection made with socket id-${socket.id}`);
    // Socket to join a room with this name
    socket.join(`${name} ${toWhom}`);
    // Saving that room as sockets room 
    socket.room=`${name} ${toWhom}`
    console.log(socket.room)
    io.to(`${name} ${toWhom}`).emit('updatechat', `${name} has connected to this room`);
    
    // During Chats
    socket.on('chat',async data=>{
        const arr=socket.room.split(" ");
        console.log(arr)
        // Finding both users from db
        const obj=await mongo.User.findOne({name:arr[0]});
        const obj1=await mongo.User.findOne({name:arr[1]});

        console.log(obj);
        // Appending the chats 
        mongo.Message.updateOne({initiator:obj._id,to:obj1._id}, {$push: {"message":  {"handle":`${data.handle}`,"msg":`${data.message}`}}}, function(err, numAffected, rawResponse) {
            console.log(err)
            console.log('The number of updated documents was %d', numAffected);
            console.log('The raw response from Mongo was ', rawResponse);
        });
        // Emmiting to all sockets in the room in our case will be one to one chat 
        // i.e Private chat
        io.to(socket.room).emit('chat',data);
    }

    )

})

app.get("/info",(req,res)=>{
    res.sendFile(__dirname+"/public/info.html");
});

app.post("/register",(req,res)=>{
    console.log(req.body);
    const hell=req.body.item;
    const jj=JSON.parse(hell)
     const questions=new mongo.question({
        person:jj._id ,
        firstname:req.body.fname,
        lastname:req.body.lname,
        phone:req.body.phone,
        age:req.body.age,
        gender:req.body.gender,
        field:req.body.field,
        college:req.body.college,
        year:req.body.year
     }).save().then(data=>console.log(data))  
});

app.post("/register2",(req,res)=>{
    console.log(req.body);
    const hell=req.body.item;
    const jj=JSON.parse(hell)
     const questions=new mongo.question({
        person:jj._id ,
        firstname:req.body.fname,
        lastname:req.body.lname,
        phone:req.body.phone,
        age:req.body.age,
        gender:req.body.gender,
        field:req.body.field,
        college:req.body.college,
        year:req.body.year
     }).save().then(data=>console.log(data))  
});
let grads=[];
app.get("/graduates",async(req,res)=>{
    const obj=await mongo.question.find({year:"-1"}).populate('person');
    console.log(obj);
    obj.forEach(el=>{
        //console.log(el.person.name,el.person.email)
        grads.push({name:el.person.name,email:el.person.email})
    });

    // grads.forEach(el=>{
    //     console.log(el)
    // })
    
    // mongo.question.find({year:"-1"},(err,data)=>{
        
    //     data.forEach(element => {
    //         mongo.User.find({_id: element.person},async(err,ele)=>{
    //             console.log(ele[0].name);
    //             console.log(ele[0].email)
    //             await grads.push(ele[0].name);
    //             await grads.push(ele[0].email);
    //         });
            
            
    //     });
        
    // });
    
    


    res.render("\graduates",{data:grads});
    grads=[];
    
});

app.post("/mail", (req,res)=>{
    res.sendFile(__dirname + "/public/email.html");
});

app.post('/mailer',(req,res)=>{
    const data=req.body;
    console.log(data);
    const to=data.to;
    const from=data.from;
    const subject=data.subject;
    const body=data.body;
    var transporter=nodemailer.createTransport({
        service:'gmail',
        port:430,
        auth:{
            user:`${from}`,
            pass:'Hethgala123'
    
        },
    });
    var mailOptions={
        from:`${from}`,
        to:`${to}`,
        subject:`${subject}`,
        text:`${body}`
    };
    transporter.sendMail(mailOptions,(err,info)=>{
    if(err){
        console.log(err);
    }
    else{
        console.log('email sent:'+info.response);
    }
    })
    res.send({messgae:'hello'});
})

// app.listen(3000,()=>{
//     console.log('listening to 3000');
// });





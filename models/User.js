//jshint esversion:6

const mongoose = require('mongoose');
const Schema=mongoose.Schema;

const questionstdSchema=new Schema({
  person:{
    type:Schema.Types.ObjectId,
    ref:"User"
  },
  firstname:String,
  lastname:String,
  phone:String,
  age:String,
  gender:String,
  field:String,
  college:String,
  year:String

});
const forumSchema=new Schema({
  question:String,
  person:{
    type:Schema.Types.ObjectId,
    ref:'user'
  },
  answer:[{
    handle:String,
    msg:String
  }],
  likes:Number
})

const MessageSchema=new Schema({
  initiator:{
      type:Schema.Types.ObjectId,
      ref:'user'
  },
  to:{
      type:Schema.Types.ObjectId,
      ref:'user'
  },
  message: [{
      // Handle is the Senders name and msg is the actual message
      handle:String,
      msg:String
  }]
})
const UserSchema = new Schema({
  name:{
    type:String,
    required: true
  },
  email:{
    type:String,
    required: true
  },
  password:{
    type:String,
    required: true
  },
  date:{
    type:Date,
    default: Date.now
  },
  // forum:{
  //   type:Schema.Types.ObjectId,
  //   ref:'forum'}
  socketid:String
});

const Message=mongoose.model('message',MessageSchema);
const Forum=mongoose.model('forum',forumSchema)
const question = mongoose.model("question",questionstdSchema);
const User = mongoose.model("User",UserSchema);


module.exports = {User,Forum,Message,question};


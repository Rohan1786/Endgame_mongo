var express = require('express');
var router = express.Router();
var mongoose=require("mongoose");

const conn=mongoose.connect("mongodb://localhost:27017/rahul")

const demo=mongoose.Schema({
  username:String,
  age:Number
})



/* GET users listing. */


module.exports = mongoose.model("semo",demo);

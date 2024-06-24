var express = require('express');
var router = express.Router();
const mo=require('./users')

/* GET home page. */
router.get('/', function(req, res) {
  req.flash("age",21);
  req.flash("name","rohan")
  res.send("hello flash created here");
});
// router.get('/create', function(req, res, next) {
//   console.log(req.flash())
//   res.send("nacho ");
// });

router.get("/create", async function(req,res){
  const create=await mo.create({
    username:"rmon",
    age:21
  })
  res.send("we are trying to implement this project"+create)
})

router.get("/finding",async function(req,res){
  const hi=RegExp("^rahan$")
const find=await mo.find({username:hi})
res.send(find)
});
module.exports = router;

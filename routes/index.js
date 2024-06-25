var express = require('express');
var router = express.Router();
const mo=require('./users')

/* GET home page. */
router.get('/', function(req, res) {
  // req.flash("age",21);
  // req.flash("name","rohan")
  res.send("hello flash created here");
});
// router.get('/create', function(req, res, next) {
//   console.log(req.flash())
//   res.send("nacho ");
// });

router.get("/create", async function(req,res){
  // const create=await mo.create({
  //   username:"Rohini",
  //   password:"hihi"
  // })
  const username=await mo.find()
  res.render('index',{username})
})

// router.get("/finding",async function(req,res){
//   const hi=RegExp("^rahan$")
// const find=await mo.find({username:hi})
// res.send(find)
// });
router.get('/login', (req, res) => {
  res.render('login');
});

// Handle login form submission
router.post('/login', async (req, res) => {
  // Input validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array()[0].msg });  // Bad request with specific error message
  }

  const { username, password } = req.body;

  let client;

  try {
    // Connect to MongoDB using connection string (replace with your actual connection string)
    const uri = "mongodb://localhost:27017"; 
    client = await mo.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    const db = client.db("rahul");

    // Find the user with the provided credentials (assuming hashed password)
    const user = await db.collection('semos').findOne({ username, password }); // Hashing logic not shown here

    if (user) {
      // Login successful (handle session if needed)
      res.json({ message: 'Login successful' }); 
    } else {
      // Invalid credentials
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred' });
  } finally {
    if (client) {
      await client.close();
    }
  }
});
module.exports = router;

var express = require('express');
var { MongoClient, ServerApiVersion ,ObjectId} = require('mongodb');
var router = express.Router({mergeParams:true});
var historyRouter = require('./history');
var crypto = require('crypto');
const util = require('util');

const client = new MongoClient(process.env.MONGODB_PWD, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

router.use('/:userId/history/', historyRouter);
/* GET users listing. */
router.get('/:userId', async function(req, res, next) {

  //get User Info from DB
  try{
    const userId = req.params.userId;
  
    console.log(typeof userId);
    console.log(userId);
    const usersDB = client.db("users");
    const users = usersDB.collection("users");

    const query = { id : userId };

    const user = await users.findOne(query); 
    console.log(user);
    console.log(!user);
    if(!user)
      res.status(300).send("No Such User");
    else {
      const resUser = {
        userName: user.userName,
        id: user.id 
      }
      console.log(resUser);
      res.status(200).send(resUser);
    }
      
  }
  catch{
    res.status(500).send("Unexpected Error");
  }
});

router.post('/' , async function(req, res, next) {
  //make new user on DB
  try{

    // 비밀번호 암호화

    // doc
    const salt = (await crypto.randomBytes(64)).toString('base64');
    
    const pbkdf2 = util.promisify(crypto.pbkdf2);
    pbkdf2(req.body.pwd, salt, 100073, 64, 'sha512')
    .then((key) => {
      const hashedPwd = key.toString('base64');
      const doc = {
        _id : new ObjectId(),
        userName : req.body.userName,
        id : req.body.id,
        pwd : hashedPwd,
        salt : salt
      }; 

      const userDB = client.db("users");
      const users = userDB.collection("users");

      return users.insertOne(doc);
    })
    .then((result)=>{
      console.log(`inserted id ${result.insertedId}`);
      res.status(200).send("Succeed");
    })
    .catch((error) =>{
      console.log(error);
    });
  }
  catch{
    res.status(500).send("Unexpected Error");
  }
})


module.exports = router;

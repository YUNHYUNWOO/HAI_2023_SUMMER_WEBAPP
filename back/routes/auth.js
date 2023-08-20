var express = require('express');
var { MongoClient, ServerApiVersion ,ObjectId} = require('mongodb');
var router = express.Router();
var crypto = require('crypto');
const util = require('util');

const client = new MongoClient(process.env.MONGODB_PWD, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

router.post('/login', async (req, res, next)=>{
    try{
        const id = req.body.id;
        
        console.log(req.body);
        console.log(id);
        const usersDB = client.db("users");
        const users = usersDB.collection("users");

        const query = { id : id };

        const user = await users.findOne(query); 
        console.log(user);
        if(!user)
            res.status(300).send("No Such User");
        else {
            console.log(1);
            crypto.pbkdf2(req.body.pwd, user.salt, 100073, 64, 'sha512', (err, key)=>{
                const hashedPwd = key.toString('base64');
                console.log(hashedPwd);
                if(hashedPwd != user.pwd)
                    res.status(300).send("No Such User");
                else{
                    const resUser = {
                        userName: user.userName,
                        id: user.id 
                    }

                    res.status(200).send(resUser);
                }
            });
        }  
    }
    catch{
        
        res.status(500).send("Unexpected Error");
    }
});

module.exports = router;
var express = require('express');
var { MongoClient, ServerApiVersion ,ObjectId} = require('mongodb');
var router = express.Router({mergeParams:true});

const client = new MongoClient(process.env.MONGODB_PWD, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
client.on('error', console.error.bind(console, 'connection error:'));
        client.once('open', function callback(){
            console.log("mongodb OK");
        })

router.get('/', async function(req, res, next){
    try{
        
        const usersDB = client.db("users");
        const history = usersDB.collection("history");
        const query = { 
            userId : req.params.userId
        }; 
        console.log(query);
        const sort = {
            timestamp : -1
        };
        const result = await history.find(query).sort(sort);
        console.log(await history.countDocuments(query));
        const resArr = await result.toArray();
        
        for(i = 0; i < resArr.length; i++){
            resArr[i]._id = resArr[i]._id.toString();
            resArr[i].timestamp = resArr[i].timestamp.toString();

            resArr[i].title = resArr[i].summarizedText.split('\n', 1)[0]

            resArr[i].content = resArr[i].summarizedText.substring(resArr[i].title.length + 1);
        }
        res.status(200).send(resArr);
    }   
    catch{
    res.status(500).send("Unexpected Error");
    }
});

router.post('/', async function(req, res, next){

    try{
        const usersDB = client.db("users");
        const history = usersDB.collection("history");
        const insertedId = new ObjectId();
        console.log(req.body);
        const query = { 
            _id : insertedId,
            userId : req.params.userId,
            timestamp : getCurrentDate(),
            images : req.body.images,
            ocrText : req.body.ocrText,
            summarizedText : req.body.summarizedText
        }; 
        console.log(query);
        const result = await history.insertOne(query);
        console.log(result);
        res.status(200).send(insertedId.toString());
    }   
    catch{
    res.status(500).send("Unexpected Error");
    }
});

router.put('/:_id', (req, res, next)=>{

    const _id = new ObjectId(req.params._id);
    const usersDB = client.db("users");
    const history = usersDB.collection("history");
    console.log(req.params._id);
    const filterQuery = { 
            _id : _id
        }; 
    const Query = { 
        $set :{
            summarizedText : `${req.body.title}\n${req.body.content}`
        }
    };
    history.updateOne(filterQuery, Query)
    .then((result)=>{   
        console.log(result);
        res.status(200).send("Succeed");
    })
    .catch((err) => {
        res.status(500).send('error');
    });
    

})
function getCurrentDate(){
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth();
    var today = date.getDate();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
    var milliseconds = date.getMilliseconds();
    return new Date(Date.UTC(year, month, today, hours, minutes, seconds, milliseconds));
}
module.exports = router;
var express = require('express');
var router = express.Router();
var fs = require('fs');
const { callbackify } = require('util');

const dataPath = "./data/notes.json";

/* GET all Notes. */
router.get('/', function(req, res, next) {
  fs.readFile(dataPath, (err,data) =>{
      if(err) {
          throw err;
      }

      res.send(JSON.parse(data));
  });
});

//POST a new Note
router.post('/', function(req, res, next) {
    var notesdata;

    fs.readFile(dataPath, (err,data) =>{
        if(err) {
            throw err;
        }
        notesdata = JSON.parse(data);

        var newNotesId = Object.keys(notesdata).length + 1;
     
        notesdata[newNotesId] = req.body.data;
        notesdata[newNotesId].id = newNotesId;

        fs.writeFile(dataPathm, JSON.stringify(notesdata), (err) =>{
            if(err) {
                throw err;
            }
        });
    console.log(notesdata); 
    res.status(200).send("new user added successfully");
    });
});

//Get Note by id
router.get('/:id', function(req, res, next){
    fs.readFile(dataPath, (err,data) =>{
        if(err){
            throw err;
        }
        var id = req.params.id;
        var notesdata = Json.parse(data);

        res.send(data[id]);
    })
})

//Delete
router.delete('/', function(req, res, next){

    fs.readFile(dataPath, (err,data) =>{
        if(err) {
            throw err;
        }
        notesdata = JSON.parse(data);
        fs.unlinkSync(dataPath);

        res.send(JSON.parse(data));
        console.log("Data have been removed");
    });
});

//EDITE note
router.put('/', function(req, res, next){

    fs.readFile(dataPath, (err,data) =>{
        if(err) {
            throw err;
        }
        res.send(JSON.parse(data));
    });
});
module.exports = router;
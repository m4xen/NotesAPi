var express = require('express');
var router = express.Router();
var fs = require('fs');
const { callbackify } = require('util');

const dataPath = "./data/notes.json";

const errorMsg = [
	{
		//getAll error = 0
		"id" : 0,
		"code": 500,
		"description" : "Cant read From JSONFile"
	},
	{
		//get Specific = 1
		"id" : 1,
		"code" : 400,
		"description" : "Could not find the specified Note"
	},
	{
		//post new note = 2
		"id" : 2,
		"code" : 400,
		"description" : "query not defined correctly"
	},
	{
		//update(put) note = 3
		"id" : 3,
		"code" : 400,
		"description" : "Could not find note to edit"
  }
];

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
router.get('/:id', function(req, res, next) {
    fs.readFile(dataPath, (err,data) =>{
        if(err) {
            throw err;
        }
        var id = req.params.id;
        var notesdata = JSON.parse(data);
  
        res.send(notesdata[id]);
    });
});

//EDITE note
router.put('/:id', function(req, res, next) {
    var id = req.params.id;
    var title = req.body.title;
    var content = req.body.content;
    var NoteArray;
    fs.readFile(dataPath, (err,data) =>{
      if(err) {
          console.log(err);
          throw err;
      }
      //change data
      NoteArray = JSON.parse(data);
      NoteArray[id].title = title;
      NoteArray[id].content = content;
      //save to file
      fs.writeFile(dataPath, JSON.stringify(NoteArray), (err) => { 
        if (err) { 
          console.log(err);
          res.status(500).send("Could not write note[" + id + "] to file" );
        }
        else {
          res.status(200).send("changed note[" + id + "]");
        }
      }); 
    });
  });

//Delete
router.delete('/:id', function(req, res, next) {
    var id = req.params.id;
    var NoteArrayForDel;
    fs.readFile(dataPath, (err,data) =>{
      if(err) {
          console.log(err);
          throw err;
      }
      NoteArrayForDel = JSON.parse(data);
      //NoteArrayForDel.splice(id, 0)
      //must complete this before i can splice
      //NoteArrayForDel.splice(id, 1);
      //give everything a new id
      for (var i = 0; i < NoteArray.length; i++) {
          NoteArray[i].id = i;
      }
    })
    
    NoteArrayForDel.splice(id, 0);
  
    fs.writeFile(dataPath, JSON.stringify(NoteArrayForDel), (err) => { 
      if (err) { 
        console.log(err);
        res.status(500).send("Could not delete[" + id + "]" );
      }
      else {
        res.status(200).send("removed note[" + id + "]");
      }
    });
  });
module.exports = router;
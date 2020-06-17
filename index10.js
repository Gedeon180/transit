var express = require('express');
var router = express.Router();

// our constructor
function Note(pTitle, pDay, pTime,pStatut) 
{this.title= pTitle; this.day = pDay; this.time = pTime; 
 this.statut=pStatut; this.toString= function(){return this.title+" due on "+this.day+" at "+this.time+"<br>"}}

ServerNotes = [];
// save typing time, make up 3 for testing
ServerNotes.push(new Note("Eng101", "Moonday 5/18","11:59 pm", "d"));
 ServerNotes.push(new Note("Prog209", "Monday 5/18", "11:59 pm","n"));
 ServerNotes.push(new Note("Play vid game", "Saturday 7/23", "10:30 am","s"));

/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Express' });
  res.sendFile('index.html');
});

/* GET All Notes data */
router.get('/getAllNotes', function(req, res) {
  res.status(200).json(ServerNotes);
});


/* Add one new note */
router.post('/AddNote', function(req, res) {
  const newNote = req.body;
  ServerNotes.push(newNote);
  res.status(200).json(newNote);
});


router.delete('/DeleteNote/:title', (req, res) => {
  const title = req.params.title;
  let found = false;
  console.log(title);    

  for(var i = 0; i < ServerNotes.length; i++) // find the match
  {
      if(ServerNotes[i].title === title){
        ServerNotes.splice(i,1);  // remove object from array
          found = true;
          break;
      }
  }

  if (!found) {
    console.log("not found");
    return res.status(500).json({
      status: "error"
    });
  } else {
  res.send('Note ' + title + ' deleted!');
  }
});

router.Edit('/Editnote/:title', (req, res) => {
  const title = req.params.title;
  let found = false;
  console.log(title);    

  for(var i = 0; i < ServerNotes.length; i++) // find the match
  {
      if(ServerNotes[i].title === title){
        ServerNotes.splice(i,1);  // remove object from array
          found = true;
          break;
      }
  }

  if (!found) {
    console.log("not found");
    return res.status(500).json({
      status: "error"
    });
  } else {
  res.send('Note ' + title + ' deleted!');
  }
});

module.exports = router;

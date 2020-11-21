
const express = require('express');
const path = require("path");
const app = express();
var PORT = process.env.PORT || 3000;
const fs = require('fs')
app.use(express.static('public'))
const db = require('./db/db.json')
const { v4: randId } = require('uuid');
// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());




//api routes
app.get("/api/notes", function (req, res) {
  res.json(db);

});

//adds note to json db
app.post("/api/notes", function (req, res) {
  console.log('Post!!');
  console.log(req.body);
  const newNote = { id: randId(), ...req.body }
  fs.readFile("./db/db.json", "utf8", function (error, data) {

    if (error) {
      return console.log(error);
    }
    console.log(data);
    const note = JSON.parse(data)
    note.push(newNote)
    console.log(note);

    fs.writeFile('db/db.json', JSON.stringify(note), (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log('data written succesfully')
      }
    })

  });


});


//delete notes by ID

 app.delete("/api/notes/:id", function(req, res) {
            notes.splice(req.params.id, 1);
            updateDb();
            console.log("Deleted note with id "+req.params.id);
        });



//html routes
app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});




function updateDb() {
            fs.writeFile("db/db.json",JSON.stringify(notes,'\t'),err => {
                if (err) throw err;
                return true;
            });
        }

    });

}

app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});


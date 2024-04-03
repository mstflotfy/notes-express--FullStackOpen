// import mongoose into express
const mongoose = require('mongoose')

// check if the bash cmd has a lenght of less than 3 arguments, and give an error and exit the process otherwise (the bash cmd to start this test is: node mong.js 'passwordkey'), 3 args: node, mong.js, then the password
if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

// grab the password from the 3rd arg and save it into password
const password = process.argv[2]

// save the url using the saved password into url
const url = 
  `mongodb+srv://devmstflotfy:${password}@cluster0.cep1p6c.mongodb.net/noteApp?retryWrites=true&w=majority&appName=Cluster0`

// tell mongoose to ignore throwing errors for querying fields or schemas that don't exist
mongoose.set('strictQuery', false)

// start a connection with the mongo db, using monguse, with the constructed url
mongoose.connect(url)

  // set up a note schema
  const noteSchema = new mongoose.Schema({
    content: String,
    important: Boolean,
  })

  // setup a note model usign the schema
  const Note = mongoose.model('Note', noteSchema)



//findImportant()
createNewNote('finish Full stack open', true)
// findAll()


function createNewNote(content = 'new note', imp = false) {

  // create a new note obj using our Note model
  const note = new Note({
    content: content,
    important: imp
  })

  note.save().then(result => {
    console.log('note saved');
    mongoose.connection.close()
  })
}

function finAll() {
  Note.find({}).then(result => {
    result.forEach(note => {
      console.log(note)
    })
    mongoose.connection.close()
  })
}

function findImportant() {
  Note.find({ important: true }).then(result => {
    result.forEach(note => {
      console.log(note);
    })
    mongoose.connection.close()
  })
}
const fs = require('fs/promises')
const path = require('path')
const chalk = require('chalk')


const notesPath = path.join(__dirname, 'db.json')

async function addNote(title) {
  const notes = await getNotes()
  const note = {
    title,
    id: Date.now().toString()
  }
  notes.push(note)
  await fs.writeFile('./db.json', JSON.stringify(notes))
  console.log(chalk.bgGreen('Note was added'))
}


async function getNotes() {
  const notes = await fs.readFile(notesPath, { encoding: 'utf-8' })
  return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : []
}

async function printNotes() {
  const notes = await getNotes()
  console.log(chalk.bgBlue('Here is the list of notes:'))
  notes.forEach(note => {
    console.log(chalk.blue(note.id, note.title))
  })
}

async function removeNote(id) {
  const notes = await getNotes()
  const updatedNotes = notes.filter(note => note.id !== id)
  await fs.writeFile('./db.json', JSON.stringify(updatedNotes))
  console.log(chalk.bgRed('Note was removed'))
}

async function editNote(id, title) {
  const notes = await getNotes()
  const updatedNotes = notes.map(note => note.id === id ? { ...note, title } : note)
  await fs.writeFile('./db.json', JSON.stringify(updatedNotes))
  console.log(chalk.bgBlue('Note was edited'))
}

module.exports = {
  addNote, printNotes, removeNote, getNotes, editNote
}

import React, { useState } from "react";

import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import AddNoteForm from "./AddNoteForm";

function App() {
    // State variable called "notes" to store all notes created by the user.
  const [notes, setNotes] = useState([]);

  // Add a note to notes array
  function addNote(note) {
      // Update "notes" array
    setNotes(function (oldNotes) {
      // Using spread operator to return a new array containing oldNotes and the new note
      return [...oldNotes, note];
    });
  }

  // Remove a note from notes array by id
  function deleteNote(id) {
      // Update "notes" array
    setNotes(function (oldNotes) {
      // Using filter to return a new array where the requested note is removed based on his index.
      return oldNotes.filter((_, index) => index !== id);
    });
  }

  // Create a new Note components array from notes array.
  const listItems = notes.map((item, index) => (
    <Note
      key={index}
      id={index}
      title={item.title}
      content={item.content}
      date={item.date}
      onDelete={deleteNote}
    />
  ));


// If notes array is not empty render all the notes else render default example note
  return (
    <div>
      <Header />
      <AddNoteForm onAdd={addNote} />
      {notes.length ? (listItems.reverse()) : (<Note key={1} title="Note title" content="Note content" date="01/02/1993"/>)}
      <Footer />
    </div>
  );
}

export default App;

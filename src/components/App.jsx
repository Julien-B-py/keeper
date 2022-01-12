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
      return [...notes, note];
    });
  }

  // Remove a note from notes array by id
  function deleteNote(id) {
      // Update "notes" array
    setNotes(function (oldNotes) {
      return oldNotes.filter((_, index) => index !== id);
    });
  }

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

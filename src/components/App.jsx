import React, { useState } from "react";

import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import AddNoteForm from "./AddNoteForm";

function App() {
  // State variable called "notes" to store all notes created by the user.
  const [notes, setNotes] = useState([]);
  // State variable to deal with sample note conditional rendering
  const [noNote, setNoNote] = useState(true);

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
      return oldNotes.filter((note) => note.id !== id);
    });
  }

// Handle sample note display
  function changeSampleNote(bool) {
    setNoNote(bool);
  }

  // Create a new Note components array from notes array.
  const listItems = notes.map((item) => (
    <Note
      key={item.id}
      id={item.id}
      title={item.title}
      content={item.content}
      date={item.date}
      onDelete={deleteNote}
      deleteButton={true}
      notesCount={notes.length}
      onHide={changeSampleNote}
    />
  ));

  // If notes array is not empty render all the notes
  // Display sample note only if noNote is set to True
  return (
    <div className="app">
      <Header />
      <div className="content">
        <AddNoteForm onAdd={addNote} />

        {notes && <div className="notes">{listItems.reverse()}</div>}

        {noNote && (
          <div className="notes">
            <Note
              key={1}
              title="Example title"
              content="Example content"
              date="01/02/1993"
              deleteButton={false}
              notesCount={notes.length}
              onHide={changeSampleNote}
            />
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default App;

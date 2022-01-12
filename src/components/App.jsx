import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import AddNoteForm from "./AddNoteForm";

function App() {
  const [notes, setNotes] = useState([]);

  function addNote(note) {
    setNotes(function (oldNotes) {
      return [...notes, note];
    });
  }

  function deleteNote(id) {

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
      onDelete={deleteNote}
    />
  ));

  return (
    <div>
      <Header />
      <AddNoteForm onAdd={addNote} />
      {notes.length ? (
        listItems
      ) : (
        <Note key={1} title="Note title" content="Note content" />
      )}

      <Footer />
    </div>
  );
}

export default App;

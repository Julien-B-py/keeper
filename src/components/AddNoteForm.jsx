import React, { useState } from "react";
import moment from "moment";

function AddNoteForm(props) {
  // State variable called "note" to store user inputs.
  const [note, setNote] = useState({
    title: "",
    content: "",
    date: ""
  });

  // Everytime an input value is changed this function is called to update "note" state variable.
  function handleChange(event) {
    // Get the name and the value of the input that triggered the event
    const name = event.target.name;
    const value = event.target.value;

    // Update "note" object
    setNote(function (oldValue) {
      // Use spread operator to make a copy of the previous object
      const newNote = {
        ...oldValue
      };
      // Only update the value which has been updated by the user
      newNote[name] = value;

      // Also add current date if not existing
      if (!newNote.date) {
        newNote.date = moment().format("DD/MM/YYYY");
      }

      return newNote;
    });
  }

  return (
    <div>
      <form>
        <input
          onChange={handleChange}
          name="title"
          placeholder="Title"
          value={note.title}
        />
        <textarea
          onChange={handleChange}
          name="content"
          placeholder="Take a note..."
          rows="3"
          value={note.content}
        />
        <button
          onClick={(e) => {
            props.onAdd(note);
            // Reset note state variable so the user can add another note
            setNote({
              title: "",
              content: "",
              date: ""
            });
            // Prevent form submit
            e.preventDefault();
          }}
        >
          <i className="fas fa-plus"> </i>
        </button>
      </form>
    </div>
  );
}

export default AddNoteForm;

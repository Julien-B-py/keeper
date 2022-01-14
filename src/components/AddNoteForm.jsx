import React, { useState } from "react";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";

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
    // Use object destructuring to access the properties name and value
    const { name, value } = event.target;

    // Update "note" object
    setNote(function (oldValue) {
      // Use spread operator to make a copy of the previous object
      const newNote = {
        ...oldValue
      };
      // Only update the value which has been updated by the user
      newNote[name] = value;

      // Also add current date and a unique id if not existing
      if (!newNote.date) {
        newNote.date = moment().format("DD/MM/YYYY");
        newNote.id = uuidv4();
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

        if (note.title && note.content) {

            props.onAdd(note);
            // Reset note state variable so the user can add another note
            setNote({
              title: "",
              content: "",
              date: ""
            });

          } else {
            const {title,content} = note;
            title?alert("Please set a content"):alert("Please set a title");
          }
            // Prevent form submit/page refresh
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

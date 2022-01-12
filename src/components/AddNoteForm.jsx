import React, { useState } from "react";

function AddNoteForm(props) {
  const [note, setNote] = useState({ title: "", content: "" });

  function handleChange(event) {
    const value = event.target.value;
    const name = event.target.name;

    setNote(function (oldValue) {
      const test = { ...oldValue };
      test[name] = value;
      return test;
    });
  }

  return (
    <div>
      <form>
        <input onChange={handleChange} name="title" placeholder="Title" />
        <textarea
          onChange={handleChange}
          name="content"
          placeholder="Take a note..."
          rows="3"
        />
        <button
          onClick={(e) => {
            props.onAdd(note);
            e.preventDefault();
          }}
        >
          Add
        </button>
      </form>
    </div>
  );
}

export default AddNoteForm;

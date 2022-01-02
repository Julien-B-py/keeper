import React from "react";

function Note(props) {
  return <div className = "notes">
   <div className = "note">
    <h1>{props.title}</h1>
    <p>{props.content}</p>
    </div>
    </div>
}

export default Note;

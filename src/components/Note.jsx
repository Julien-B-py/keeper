import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";


function Note(props) {
  const noteRef = useRef();
  const tlCreation = useRef();
  const tlDeletion = useRef();

  const [deleted, setDeleted] = useState(false);

  // Animate note on creation
  // only runs on first render
  useEffect(() => {
        tlCreation.current = gsap.timeline()
        .from(noteRef.current,{width:0, padding:0, margin:0})
        .from(noteRef.current, { scale: 0 }, "-=0.15");
  }, []);


  // Animate note on deletion
  // only runs when deleted value is changed
    useEffect(() => {
      if (!deleted) return;
    tlDeletion.current = gsap.timeline({onComplete: ()=> props.onDelete(props.id)})
.to(noteRef.current, {
    scale: 0,
    autoAlpha: 0,
    duration: 1
  }).to(noteRef.current, {width:0, padding:0, margin:0}, "-=0.35")

        }, [deleted]);


  const deleteButton = (
    <button
      onClick={() => {
        setDeleted(true);
      }}
    >
      <i className="fas fa-trash-alt"></i>
    </button>
  );

  return (
    <div className="note" ref={noteRef}>
      <h1>{props.title}</h1>
      <p>{props.content}</p>
      <p className="note-date">{props.date}</p>
      {deleteButton}
    </div>
  );
}

export default Note;

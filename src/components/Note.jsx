import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";

function Note(props) {
  // store a reference to the note div
  const noteRef = useRef();

  const tlCreation = useRef();
  const tlDeletion = useRef();

  const [deleted, setDeleted] = useState(false);

  // Animate note on creation
  // only runs on first render
  // useLayoutEffect to avoiding flash of unstyled content
  useLayoutEffect(() => {
    tlCreation.current = gsap
      .timeline()
      .from(noteRef.current, { height: 0, width: 0, padding: 0, margin: 0 })
      .from(noteRef.current, { scale: 0 }, "-=0.15")
      .from(noteRef.current.firstChild, { y: "-150%", autoAlpha: 0 })
      .from(noteRef.current.children[1], { x: "-110%", autoAlpha: 0 }, "<")
      .from(noteRef.current.children[2], { y: "220%", autoAlpha: 0 }, "<")
      .from(noteRef.current.lastChild, { scale: 0 });

    // cleanup function
    return () => {
      tlCreation.current.kill();
    };
  }, []);

  // useEffect : wait until DOM has been rendered
  // Animate note on deletion
  // only runs when deleted value is changed to true
  useEffect(() => {
    if (!deleted) return;

    tlDeletion.current = gsap
      .timeline({ onComplete: () => props.onDelete(props.id) })
      .to(noteRef.current, {
        scale: 0,
        autoAlpha: 0,
        duration: 1
      })
      .to(noteRef.current, { height: 0, width: 0, padding: 0, margin: 0 });

    // cleanup function
    return () => {
      tlDeletion.current.kill();
    };
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

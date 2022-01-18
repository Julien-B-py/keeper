import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";

function Note(props) {
  // store a reference to the note div
  const noteRef = useRef();

  const tlCreation = useRef();
  const tlDeletion = useRef();

  const [deleted, setDeleted] = useState(false);

  // Animate user notes
  // Only runs when deleted value is changed
  // useLayoutEffect to avoiding flash of unstyled content
  useLayoutEffect(() => {
    if (props.deleteButton) {
      if (!deleted) {
        tlCreation.current = gsap
          .timeline()
          .from(noteRef.current, { height: 0, width: 0, padding: 0, margin: 0 })
          .from(noteRef.current, { scale: 0 }, "-=0.15")
          .from(noteRef.current.firstChild, { y: "-150%", autoAlpha: 0 })
          .from(noteRef.current.children[1], { x: "-110%", autoAlpha: 0 }, "<")
          .from(noteRef.current.children[2], { y: "220%", autoAlpha: 0 }, "<")
          .from(noteRef.current.children[3], { scale: 0 });
      } else {
        tlDeletion.current = gsap
          .timeline({
            onComplete: () => {
              props.deleteButton && props.onDelete(props.id);
              if (props.notesCount === 1) {
                props.onHide(true);
              }
            }
          })
          .to(noteRef.current, {
            scale: 0,
            autoAlpha: 0
          })
          .to(noteRef.current, { height: 0, width: 0, padding: 0, margin: 0 });
      }
    }
  }, [deleted]);

  // Animate sample note disappearance
  useEffect(() => {
    if (!props.deleteButton) {
      if (props.notesCount !== 0) {
        tlDeletion.current = gsap
          .timeline({ onComplete: () => props.onHide(false) })
          .to(noteRef.current, {
            scale: 0,
            autoAlpha: 0
          })
          .to(noteRef.current, { height: 0, width: 0, padding: 0, margin: 0 });
      }
    }
  }, [props.notesCount]);

  // Animate sample note appearance
  useLayoutEffect(() => {
    if (!props.deleteButton) {
      tlCreation.current = gsap
        .timeline()
        .from(noteRef.current, { height: 0, width: 0, padding: 0, margin: 0 })
        .from(noteRef.current, { scale: 0 }, "-=0.15")
        .from(noteRef.current.firstChild, { y: "-150%", autoAlpha: 0 })
        .from(noteRef.current.children[1], { x: "-110%", autoAlpha: 0 }, "<")
        .from(noteRef.current.children[2], { y: "220%", autoAlpha: 0 }, "<");
    }
  }, [props.deleteButton]);

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
      {props.deleteButton && deleteButton}
    </div>
  );
}

export default Note;

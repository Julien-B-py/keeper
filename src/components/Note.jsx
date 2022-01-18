import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";

function Note(props) {
  // store a reference to the note div
  const noteRef = useRef();

  const tlCreation = useRef();
  const tlDeletion = useRef();

  const [deleted, setDeleted] = useState(false);

  // Animate notes on creation
  // only runs when deleted value is changed
  // useLayoutEffect to avoiding flash of unstyled content
  useLayoutEffect(() => {

if (!deleted) {

  tlCreation.current = gsap
    .timeline()
    .from(noteRef.current, { height: 0, width: 0, padding: 0, margin: 0 })
    .from(noteRef.current, { scale: 0 }, "-=0.15")
    .from(noteRef.current.firstChild, { y: "-150%", autoAlpha: 0 })
    .from(noteRef.current.children[1], { x: "-110%", autoAlpha: 0 }, "<")
    .from(noteRef.current.children[2], { y: "220%", autoAlpha: 0 }, "<")
    .from(noteRef.current.children[3], { scale: 0 });

}



    // Before unmounting component
    return () => {

      tlDeletion.current = gsap
        .timeline({ onComplete: () => props.deleteButton && props.onDelete(props.id) })
        .to(noteRef.current, {
          scale: 0,
          autoAlpha: 0,
        }).to(noteRef.current, { height: 0, width: 0, padding: 0, margin: 0 });



    };
  }, [deleted]);












//   useEffect(() => {
//
//     return () => {
//
// if(!props.deleteButton) {
//
// console.log("called")
//
//   tlDeletion.current = gsap
//     .timeline()
//     .to(noteRef.current, {
//       scale: 0,
//       autoAlpha: 0,
//     }).to(noteRef.current, { height: 0, width: 0, padding: 0, margin: 0 });
// }
//
//
//     };
//
//
//   }, [props.deleteButton]);





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

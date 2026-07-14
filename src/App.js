import React, { useState, useEffect, useRef } from "react";
import "./App.css";
function App() {
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem("notes");
    return savedNotes ? JSON.parse(savedNotes) : [];
  });
  const [noteText, setNoteText] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const inputRef = useRef(null);
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);
  useEffect(() => {
    inputRef.current.focus();
  }, []);
  const addOrUpdateNote = () => {
    if (noteText.trim() === "") return;
    if (editIndex !== null) {
      const updatedNotes = [...notes];
      updatedNotes[editIndex] = noteText;
      setNotes(updatedNotes);
      setEditIndex(null);
    } else {
      setNotes([...notes, noteText]);
    }
    setNoteText("");
    inputRef.current.focus();
  };
  const editNote = (index) => {
    setNoteText(notes[index]);
    setEditIndex(index);
    inputRef.current.focus();
  };
  const deleteNote = (index) => {
    const updatedNotes = notes.filter((_, i) => i !== index);
    setNotes(updatedNotes);
  };
  return (
    <div className="container">
      <h1>📝 Notes Application</h1>
      <div className="input-section">
        <input
          ref={inputRef}
          type="text"
          placeholder="Write your note..."
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
        />
        <button onClick={addOrUpdateNote}>
          {editIndex !== null ? "Update Note" : "Add Note"}
        </button>
      </div>
      <div className="notes-list">
        {notes.length === 0 ? (
          <p className="empty">No Notes Available</p>
        ) : (
          notes.map((note, index) => (
            <div className="note-card" key={index}>
              <p>{note}</p>
              <div className="buttons">
                <button
                  className="edit"
                  onClick={() => editNote(index)}
                >
                  Edit
                </button>
                <button
                  className="delete"
                  onClick={() => deleteNote(index)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
export default App;
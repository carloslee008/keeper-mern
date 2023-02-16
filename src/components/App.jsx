import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import axios from "axios";

const client = axios.create({
  baseURL: "https://keeper-mern-gh3q.onrender.com/notes"
})

function App() {
  const [notes, setNotes] = useState([]);

  function addNote(newNote) {
    setNotes(prevNotes => {
      return [...prevNotes, newNote];
    });
  }

  useEffect(() => {
    fetch(`https://keeper-mern-gh3q.onrender.com/notes/`)
    .then((res) => res.json())
    .then((data) => setNotes(data))
  })

  function deleteNote(id) {
    client.delete(`/${id}`);
   }

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map((noteItem, index) => {
        return (
          <Note
            key={index}
            _id={noteItem._id}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;

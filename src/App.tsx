// React
import React, { useState, useEffect } from 'react';

// CSS
import './App.scss';

// Constants
import { headerText } from './constants/general';

import NoteForm from './components/noteForm';
import Note from './components/note';

const App = () => {
  const [update, setUpdate] = useState(false);

  let currentNotes = [];
  const storageNotes: string | null = localStorage.getItem('notes');
  if (storageNotes) {
    currentNotes = JSON.parse(storageNotes);
  }

  useEffect(() => {}, [update]);

  const shouldUpdate = () => {
    setUpdate(!update);
  };

  return (
    <div className="App">
      <header className="header-text">
        <p>{headerText}</p>
      </header>
      <NoteForm shouldUpdate={shouldUpdate} />
      <div className="note">
        {currentNotes.map(
          (note: { noteText: string; date: string }, key: number) => {
            return (
              <Note
                key={key}
                noteKey={key}
                noteText={note.noteText}
                noteDate={note.date}
                shouldUpdate={shouldUpdate}
              />
            );
          },
        )}
      </div>
    </div>
  );
};

export default App;

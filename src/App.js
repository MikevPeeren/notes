// React
import React from 'react';

// CSS
import './App.scss';

// Constants
import { headerText } from './constants/general';

import NoteForm from './components/noteForm';

const App = () => {
  return (
    <div className="App">
      <header className="header-text">
        <p>{headerText}</p>
      </header>
      <NoteForm />
    </div>
  );
};

export default App;

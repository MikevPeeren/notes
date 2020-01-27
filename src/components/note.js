// React
import React, { useState } from 'react';

import PropTypes from 'prop-types';

// React Bootstrap
import { Card, CardBody, CardTitle, Button, Input } from 'reactstrap';

// CSS
import './note.scss';

// Constants
import { saveNote, editNote, deleteNote } from '../constants/notes';

// Markdown Converter
const showdown = require('showdown');

// React Markdown
const ReactMarkdown = require('react-markdown/with-html');

const Note = props => {
  const [noteText, setNoteText] = useState();
  const [isInEditMode, setIsInEditMode] = useState(false);

  const converter = new showdown.Converter();

  const handleEdit = () => {
    setIsInEditMode(true);
  };

  const handleSave = (event, noteKey) => {
    event.preventDefault();

    const currentNotes = JSON.parse(localStorage.getItem('notes')) || [];

    currentNotes[noteKey] = converter.makeHtml(noteText);

    localStorage.setItem('notes', JSON.stringify(currentNotes));

    setIsInEditMode(false);
    props.shouldUpdate();
  };

  const handleChange = event => {
    setNoteText(event.target.value);
  };

  const handleDelete = noteKey => {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes.splice(noteKey, 1);
    localStorage.setItem('notes', JSON.stringify(notes));
    props.shouldUpdate();
  };

  return (
    <Card className="card-note">
      <CardBody>
        <CardTitle>Note {props.noteKey + 1}</CardTitle>
        {isInEditMode ? (
          <>
            <Input
              className="card-note__textarea"
              type="textarea"
              name="text"
              id="addNoteText"
              onChange={event => {
                handleChange(event);
              }}
            />
            <Button
              className="card-note__button"
              onClick={event => {
                handleSave(event, props.noteKey);
              }}
            >
              {saveNote}
            </Button>
          </>
        ) : (
          <>
            <ReactMarkdown source={props.note} escapeHtml={false} />
            <Button
              className="card-note__button-left"
              onClick={() => {
                handleEdit();
              }}
            >
              {editNote}
            </Button>
            <Button
              className="card-note__button-right"
              onClick={() => {
                handleDelete(props.noteKey);
              }}
            >
              {deleteNote}
            </Button>
          </>
        )}
      </CardBody>
    </Card>
  );
};

Note.propTypes = {
  noteKey: PropTypes.number.isRequired,
  note: PropTypes.string.isRequired,
  shouldUpdate: PropTypes.func.isRequired,
};

export default Note;

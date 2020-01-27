// React
import React, { useState } from 'react';
import PropTypes from 'prop-types';

// React Bootstrap
import { Card, CardText, CardBody, CardTitle, Button, Input } from 'reactstrap';

// CSS
import './note.scss';

// Constants

const Note = props => {
  const [noteText, setNoteText] = useState();
  const [isInEditMode, setIsInEditMode] = useState(false);

  const handleEdit = () => {
    setIsInEditMode(true);
  };

  const handleSave = (event, noteKey) => {
    event.preventDefault();

    const currentNotes = JSON.parse(localStorage.getItem('notes')) || [];

    // Update the NoteText
    currentNotes[noteKey] = noteText;
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
              Save Note
            </Button>
          </>
        ) : (
          <>
            <CardText>{props.note}</CardText>
            <Button
              className="card-note__button-left"
              onClick={() => {
                handleEdit();
              }}
            >
              Edit Note
            </Button>
            <Button
              className="card-note__button-right"
              onClick={() => {
                handleDelete(props.noteKey);
              }}
            >
              Delete Note
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

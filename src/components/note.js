// React
import React, { useState } from 'react';

import PropTypes from 'prop-types';

// React Bootstrap
import {
  Card,
  CardBody,
  CardTitle,
  Button,
  Input,
  CardSubtitle,
} from 'reactstrap';

// CSS
import './note.scss';

// Constants
import {
  saveNote,
  editNote,
  deleteNote,
  noteTitle,
  noteSubtitle,
} from '../constants/notes';

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

    const today = new Date().toDateString();

    currentNotes[noteKey] = {
      noteText: converter.makeHtml(noteText),
      date: today,
    };

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
        <CardTitle className="card-note__title">
          {noteTitle} {props.noteKey + 1}
        </CardTitle>
        <CardSubtitle className="card-note__subtitle">
          {noteSubtitle} {props.noteDate}
        </CardSubtitle>
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
            <ReactMarkdown source={props.noteText} escapeHtml={false} />
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
  noteText: PropTypes.string.isRequired,
  noteDate: PropTypes.string.isRequired,
  shouldUpdate: PropTypes.func.isRequired,
};

export default Note;

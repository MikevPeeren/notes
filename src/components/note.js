// React
import React from 'react';
import PropTypes from 'prop-types';

// React Bootstrap
import { Card, CardText, CardBody, CardTitle, Button } from 'reactstrap';

// CSS
import './note.scss';

// Constants

const Note = props => {
  const handleEdit = event => {
    // ToDo edit the text
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
        <CardText> {props.note}</CardText>
        <Button className="card-note__button" onClick={handleEdit}>
          Edit Note
        </Button>
        <Button
          className="card-note__button"
          onClick={() => {
            handleDelete(props.noteKey);
          }}
        >
          Delete Note
        </Button>
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

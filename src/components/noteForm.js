// React
import React, { useState } from 'react';

// React Bootstrap
import { Form, FormGroup, Label, Input, Button, Col } from 'reactstrap';

// CSS
import './noteForm.scss';

// Constants
import { createNote, addNote } from '../constants/notes';
const NoteForm = () => {
  const [noteText, setNoteText] = useState(0);

  const addNoteToStorage = event => {
    event.preventDefault();

    const currentNotes = JSON.parse(localStorage.getItem('notes')) || [];
    const newNotes = [...currentNotes, noteText];

    localStorage.setItem('notes', JSON.stringify(newNotes));
  };

  const handleChange = event => {
    setNoteText(event.target.value);
  };

  return (
    <div>
      <Form className="add-note-form">
        <Col>
          <FormGroup>
            <Label className="add-note-form__label" for="addNoteText">
              {createNote}
            </Label>
            <Input
              className="add-note-form__textarea"
              type="textarea"
              name="text"
              id="addNoteText"
              onChange={event => {
                handleChange(event);
              }}
            />
          </FormGroup>
        </Col>
        <Col>
          <FormGroup>
            <Button color="primary" onClick={addNoteToStorage}>
              {addNote}
            </Button>
          </FormGroup>
        </Col>
      </Form>
    </div>
  );
};

export default NoteForm;

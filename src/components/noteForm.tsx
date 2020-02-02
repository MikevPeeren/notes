// React
import React, { useState } from 'react';
import PropTypes from 'prop-types';

// React Bootstrap
import { Form, FormGroup, Label, Input, Button, Col } from 'reactstrap';

// CSS
import './noteForm.scss';

// Constants
import { createNote, addNote } from '../constants/notes';

const NoteForm = (props: any) => {
  const [noteText, setNoteText] = useState();

  const addNoteToStorage = (event: { preventDefault: () => void }) => {
    event.preventDefault();

    const today = new Date().toDateString();

    let currentNotes = [];
    const storageNotes: string | null = localStorage.getItem('notes');
    if (storageNotes) {
      currentNotes = JSON.parse(storageNotes);
    }

    const newNotes = [
      ...currentNotes,
      {
        noteText: noteText,
        date: today,
      },
    ];

    localStorage.setItem('notes', JSON.stringify(newNotes));
    props.shouldUpdate();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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

NoteForm.propTypes = {
  shouldUpdate: PropTypes.func.isRequired,
};

export default NoteForm;

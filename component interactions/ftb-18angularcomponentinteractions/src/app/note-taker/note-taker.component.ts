import { Component, OnInit } from '@angular/core';
import { Note } from '../note/note';
import { NoteService } from '../services/note.service';

import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-note-taker',
  templateUrl: './note-taker.component.html',
  styleUrls: ['./note-taker.component.css']
})
export class NoteTakerComponent implements OnInit {

 
  note: Note = new Note();
  notes: Array<Note> = [];

  constructor(private noteservice: NoteService) { }  // injected the http-client

  ngOnInit() {
  }

  takeNotes(noteForm: NgForm) {

    if (noteForm.valid) {
      this.note = noteForm.value;

      this.noteservice.addNote(this.note).subscribe(
        data => {
          this.notes.push(data);
          console.log(this.notes);
        },
        err => {

        });
    }
    else {
      console.log("Data Not Valid")
    }
  }
}

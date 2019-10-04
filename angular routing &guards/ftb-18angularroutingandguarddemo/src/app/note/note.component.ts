import { Component, OnInit } from '@angular/core';
import { Note } from './note';
import { NoteService } from '../services/note.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit {


  note: Note = new Note();
  notes: Array<Note> = [];

  constructor(private noteservice: NoteService) { }  // injected the http-client

  ngOnInit() {
    this.noteservice.getNotes().subscribe(
      notedetails => this.notes = notedetails,
      err => console.log(err)
    )
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

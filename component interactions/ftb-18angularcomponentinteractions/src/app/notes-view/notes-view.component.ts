import { Component, OnInit } from '@angular/core';
import { Note } from '../note/note';
import { NoteService } from '../services/note.service';

@Component({
  selector: 'app-notes-view',
  templateUrl: './notes-view.component.html',
  styleUrls: ['./notes-view.component.css']
})
export class NotesViewComponent implements OnInit {

  
  notes: Array<Note> = [];

  constructor(private noteservice: NoteService) { }  // injected the http-client

  ngOnInit() {
    this.noteservice.getNotes().subscribe(
      notedetails => this.notes = notedetails,
      err => console.log(err)
    )
  }
}
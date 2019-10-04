import { Component, OnInit, Input } from '@angular/core';
import { Note } from './note';
import { NoteService } from '../services/note.service';
import { RouterService } from '../services/router.service';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit {


  @Input()
  note: Note;

  constructor(private routerservice:RouterService) { }  // injected the http-client

  ngOnInit() {
  }

  openEditNoteView()
  {
    this.routerservice.routeToEditNoteView(this.note.id);
  }
}
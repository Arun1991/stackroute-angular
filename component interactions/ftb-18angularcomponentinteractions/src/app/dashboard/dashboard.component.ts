import { Component, OnInit } from '@angular/core';
import { NotesViewComponent } from '../notes-view/notes-view.component';
import { NoteService } from '../services/note.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private notesservice:NoteService) 
  { 
    this.notesservice.fetchNotesFromServer();
  }

  ngOnInit() {
  }

}

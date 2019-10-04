import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Note } from '../note/note';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  constructor(private httpclient: HttpClient) {
  }

  getNotes(): Observable<Note[]> {
    return this.httpclient.get<Note[]>("http://localhost:3000/notes");
  }

  addNote(note: Note) {
    return this.httpclient.post<Note>("http://localhost:3000/notes", note);
  }

}

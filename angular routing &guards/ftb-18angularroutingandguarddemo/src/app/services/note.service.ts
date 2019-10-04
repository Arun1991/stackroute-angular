import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Note } from '../note/note';
import { HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  constructor(private httpclient: HttpClient,private authservice:AuthService) {
  }

  getNotes(): Observable<Note[]> {
    return this.httpclient.get<Note[]>("http://localhost:3000/api/v1/notes",{
      headers:new HttpHeaders().set('Authorization',`${this.authservice.getBearerToken()}`)
    });
  }

  addNote(note: Note) {
    return this.httpclient.post<Note>("http://localhost:3000/api/v1/notes", note,{
      headers:new HttpHeaders().set('Authorization',`${this.authservice.getBearerToken()}`)
    })
  }
}

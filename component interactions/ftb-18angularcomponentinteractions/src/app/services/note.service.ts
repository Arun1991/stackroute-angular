import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Note } from '../note/note';
import { HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class NoteService {

  notes:Note[];
  notesSubject:BehaviorSubject<Note[]>

  constructor(private httpClient:HttpClient,private authservice:AuthService) 
  { 
    this.notes = [];
    this.notesSubject = new BehaviorSubject([]);
  }

  fetchNotesFromServer()
  {
    return this.httpClient.get<Note[]>('http://localhost:3000/api/v1/notes',{
      headers:new HttpHeaders().set('Authorization',`${this.authservice.getBearerToken()}`)
    }).subscribe(notesres =>{
      console.log("Note Res"+JSON.stringify(notesres));
      this.notes = notesres;
      console.log("fetchfs notes data"+JSON.stringify(this.notes));
      this.notesSubject.next(this.notes);
    },
    (err:any)=>{
      this.notesSubject.error(err);
    }
  )
  }
  
  getNotes():BehaviorSubject<Note[]>
  {
    return this.notesSubject;
  }

  addNote(note: Note) {
    return this.httpClient.post<Note>('http://localhost:3000/api/v1/notes',note,{
      headers:new HttpHeaders().set('Authorization',`${this.authservice.getBearerToken()}`)
    }).pipe(tap(addedNote =>{
      this.notes.push(addedNote);
      this.notesSubject.next(this.notes)
    }))
  }

  getNotebyId(noteId:number):Note
  {
    let foundnote=this.notes.find(note=>note.id==noteId);
    return foundnote;
  }


  editSaveNote(note:Note)
  {
    return this.httpClient.put<Note>(`http://localhost:3000/api/v1/notes/${note.id}`,note,{
      headers:new HttpHeaders().set('Authorization',`${this.authservice.getBearerToken()}`)
    }).pipe(tap(editedNote =>{
      const note = this.notes.find(note=> note.id === editedNote.id)
      Object.assign(note,editedNote);
      this.notesSubject.next(this.notes)
    }))
  }
}

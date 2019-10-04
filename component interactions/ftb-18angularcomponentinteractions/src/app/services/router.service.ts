import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RouterService {

  constructor(private router:Router) { }

  routeToLogin()
  {
    this.router.navigate(['login']);
  }

  routeToNotes()
  {
    this.router.navigate(['dashboard']);
  }

  routeToNotesView()
  {
    this.router.navigate(['dashboard/view/notesview']);
  }

  routeToEditNoteView(noteId)
  {
    this.router.navigate(['dashboard',{
      outlets:{
        noteEditOutlet:['note',noteId,'edit']
      }
    }])
  }
}

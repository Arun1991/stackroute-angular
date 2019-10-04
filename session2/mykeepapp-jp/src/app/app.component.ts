import { Component } from '@angular/core';

import {HttpClient} from '@angular/common/http';

class Note{
  title:string;
  text:string;

  constructor(){
    this.title="mytitle1";
    this.text ="mytext1";
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
 // title = 'MyKeepApp';

 constructor(private http: HttpClient){}  // injected the http-client

ngOnInit(){
  this.http.get<Array<Note>>('http://localhost:3000/notes').subscribe(
    data => this.notes = data,
    err => console.log(err)
  )
}
 note:Note = new Note(); // this creates a notes object
// to store multiple values .. createing an array object for note

notes:Array<Note> = [];  // array of note type

 takeNotes(){

  /*this.notes.push(this.note);
   console.log(this.note);
   this.note=new Note();  // this is meant for a new entry } */

   this.http.post<Note>('http://localhost:3000/notes',this.note).subscribe(
     data => this.notes.push(data),
     err => console.log(err)
   )
  this.note = new Note();
  console.log(this.notes);

}
}

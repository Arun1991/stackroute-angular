import { Component } from '@angular/core';

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

 note:Note = new Note(); // this creates a notes object
// to store multiple values .. createing an array object for note

notes:Array<Note> = [];  // array of note type

 takeNotes(){

  this.notes.push(this.note);
   console.log(this.note);
   this.note=new Note();  // this is meant for a new entry
 }


}

import { Component, OnInit, Inject } from '@angular/core';
import { Note } from '../note/note';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { inject } from '@angular/core/testing';
import { NoteService } from '../services/note.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-note-view',
  templateUrl: './edit-note-view.component.html',
  styleUrls: ['./edit-note-view.component.css']
})
export class EditNoteViewComponent implements OnInit {

  note:Note;

  noteForm:FormGroup;

  constructor(

    private dialogref:MatDialogRef<EditNoteViewComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
    public noteService:NoteService,
    public fb:FormBuilder
  ) 
  { 
    this.note=new Note();
    this.note = this.noteService.getNotebyId(this.data.noteId);

    this.noteForm =  this.fb.group({

      title:[this.note.title,Validators.compose([Validators.required,Validators.minLength(6)])],
      text:[this.note.text,Validators.compose([Validators.required,Validators.minLength(6)])]
    })
  }

  ngOnInit() {
  }


  onEditSave(noteFormRef)
  {
    let note:Note=new Note();

    note.id =  this.note.id;
    note.title=this.noteForm.value.title;
    note.text=this.noteForm.value.text;

    this.noteService.editSaveNote(note).subscribe(
      data=>{},
      err=>{}
    );this.dialogref.close();
  }
}

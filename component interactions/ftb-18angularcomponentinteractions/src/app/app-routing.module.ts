import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NoteComponent } from './note/note.component';
import { CanactivateGuard } from './guards/canactivate.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NotesViewComponent } from './notes-view/notes-view.component';
import { EditNoteOpenerComponent } from './edit-note-opener/edit-note-opener.component';


const routes: Routes = [

  { path: '', redirectTo: "dashboard", pathMatch: "full" },
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard', component: DashboardComponent, canActivate: [CanactivateGuard],
    children: [
      { path: '', redirectTo: "view/notesview", pathMatch: "full" },
      { path: 'view/notesview', component: NotesViewComponent },
      { path: 'note/:noteid/edit', component: EditNoteOpenerComponent, outlet: 'noteEditOutlet' }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NoteComponent } from './note/note.component';
import { CanactivateGuard } from './guards/canactivate.guard';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'notes', component: NoteComponent,canActivate:[CanactivateGuard]},
  { path: '', redirectTo: "login", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

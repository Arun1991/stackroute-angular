import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from './user';
import { FormGroup, FormControl, FormBuilder, Validators, FormGroupDirective } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { RouterService } from '../services/router.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userObj: User;
  loginForm: FormGroup;
  bearerToken: string;
  errmessage: string;

  @ViewChild(FormGroupDirective, { static: false })
  formGroupDirective: FormGroupDirective;
  // = new FormGroup({
  //   username:new FormControl(),
  //   password:new FormControl(),
  // })

  constructor(private formbuilder: FormBuilder, private authservice: AuthService, private routerservice: RouterService) {
    this.userObj = new User();

    this.loginForm = formbuilder.group({
      username: ['Test', Validators.compose([Validators.required, Validators.minLength(3)])],
      password: ['Test', Validators.compose([Validators.required, Validators.minLength(3)])]
    })
  }

  ngOnInit() {
  }

  loginSubmit() {
    this.userObj = this.loginForm.value;
    console.log(this.userObj.username + "        " + this.userObj.password);


    this.authservice.authenticateUser({
      username: this.userObj.username,
      password: this.userObj.password
    }).subscribe(
      res => {
        this.bearerToken = res['token'];
        console.log(this.bearerToken);
        this.authservice.setBearerToken(this.bearerToken);
        console.log("Token Stored");
        this.routerservice.routeToNotes();
      },
      err => {
        if (err.status === 403) {
          this.errmessage = err.error.message;
        }
        else {
          this.errmessage = err.message;
        }
      }
    )

    this.formGroupDirective.resetForm();
  }
}

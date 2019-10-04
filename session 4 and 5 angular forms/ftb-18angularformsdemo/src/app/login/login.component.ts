import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from './user';
import { FormGroup, FormControl, FormBuilder, Validators, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userObj: User;
  loginForm: FormGroup;


  @ViewChild(FormGroupDirective,{static:false})
  formGroupDirective:FormGroupDirective;
  // = new FormGroup({
  //   username:new FormControl(),
  //   password:new FormControl(),
  // })

  constructor(private formbuilder: FormBuilder) {
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

    this.formGroupDirective.resetForm();
  }
}

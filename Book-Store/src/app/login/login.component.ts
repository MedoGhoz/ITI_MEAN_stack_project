import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  loginForm!:FormGroup
  isSubmitted=false;
  returnUrl="";


  constructor(private formbuilder:FormBuilder , private userService:UserService , private activatedrouter:ActivatedRoute ,private rotuer : Router)  { }

  ngOnInit(): void {
    this.loginForm=this.formbuilder.group({
      email:['',[Validators.required,Validators.email]],
      password:['',Validators.required]
    });

    this.returnUrl=this.activatedrouter.snapshot.queryParams.returnUrl;
  }

get fc(){
  return this.loginForm.controls;
}

submit(){
  this.isSubmitted=true;
  if(this.loginForm.invalid) return;
  // alert(`email: ${this.fc.email.value}, password:${this.fc.password.value}`)
  this.userService.login({email:this.fc.email.value,password:this.fc.password.value}).subscribe(()=>{
    this.rotuer.navigateByUrl(this.returnUrl)
  });
}

}

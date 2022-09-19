import { Component, OnInit } from '@angular/core';
import { AbstractControl, Form, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IUserLogin } from 'IUserLogin';
import { IUserRegister } from 'IUserRegister';
import { UserService } from '../user.service';
// import { UserServicesService } from '../user-services.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
// private userServ: UserServicesService


  registerForm!:FormGroup;
  isSubmitted=false;
  returnUrl='';


  constructor(private formBuilder: FormBuilder,private userService:UserService, private activatedRoute:ActivatedRoute , private  router:Router) { }


  ngOnInit(): void {
    this.registerForm=this.formBuilder.group({

      email:['',[Validators.required, Validators.email]],
      password:['',[Validators.required , Validators.minLength(6)]],
      name:['',Validators.required],
      gender:['',Validators.required],

    });
    this.returnUrl=this.activatedRoute.snapshot.queryParams.returnUrl;
  }

get fc(){
  return this.registerForm.controls
}

submit(){
  this.isSubmitted=true;

  const fv = this.registerForm.value;
  const user:IUserRegister={
    email:fv.email,
    password:fv.password,
    name:fv.name,
    gender:fv.gender
  };
  this.userService.register(user).subscribe(_ =>{
    this.router.navigateByUrl('/login');
  } )

}
}

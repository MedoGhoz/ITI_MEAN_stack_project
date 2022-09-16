import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
// import { UserServicesService } from '../user-services.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
// private userServ: UserServicesService
  constructor() { }

  ngOnInit(): void {
  }

  // addUser(formData: NgForm) {
  //   if (formData.invalid) {
  //     console.log('you must add value');
  //     return;
  //   }
  //   this.userServ.addNewUser(
  //     formData.value.name,
  //     formData.value.email,
  //     formData.value.password,
  //     formData.value.gender,
  //   );
  //   formData.resetForm();
  // }

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/userService/user.service';



@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  registerForm!: FormGroup; 
  submitted = false;

  constructor(private userService:UserService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  // Convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onRegisterSubmit(): void {
    this.submitted = true;

    // Stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    const {firstName,lastName,email, password}= this.registerForm.value;

    this.userService.registerApi({
      firstName:firstName,
      lastName:lastName,
      email : email,
      password : password
    }).subscribe( results =>{console.log(results)},error=>{console.log(error)});

    // TODO: Implement signup functionality

    console.log('signup successful', this.registerForm.value);
  }

}
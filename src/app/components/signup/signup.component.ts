import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/userService/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  registerForm!: FormGroup; 
  submitted = false;
  registrationMessage: string = '';
  registrationMessageColor: string = 'green'; // Change this to any color you prefer


  constructor(private userService:UserService, private formBuilder: FormBuilder, private router: Router) { }

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
    }).subscribe(
      (response) => {
        // Assuming the API returns a message in the response
      this.registrationMessage = response.message;
      this.registrationMessageColor = 'green'; // Success color
      },
      (error) => {
       // Handle error
      this.registrationMessage = 'An error occurred. Please try again later.';
      this.registrationMessageColor = 'red'; // Error color
      }
    );
    console.log('signup successful', this.registerForm.value);
  // Redirect to login page after successful registration
  //this.redirectLogin();

  }
  redirectLogin(){
    this.router.navigate(['']);
  }


}
  
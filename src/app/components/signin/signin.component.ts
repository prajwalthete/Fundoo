import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/userService/user.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  loginForm!: FormGroup;
  submitted = false;
  errorMessage: string = ''; // Declare errorMessage property here
  loginMessageColor: string = 'green';

  constructor(private userService: UserService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  // Convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  handelLogin() {
    this.submitted = true;

    // Stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    const { email, password } = this.loginForm.value;

    this.userService.loginApi({
      email: email,
      password: password
    }).subscribe(
      results => {
        
        console.log(results);
        
        this.errorMessage = results.message;
        this.loginMessageColor= 'green';
        setTimeout(() => {
          this.errorMessage = ''; // Clear the message after 5 seconds
        }, 5000); // 5 seconds delay
      
        
      },
      error => {
       this.errorMessage = 'Invalid credentials.!';
       this.loginMessageColor = 'red';
      }
    );
  }

  handelCreateAccount() {
    this.router.navigate(['/signup']);
  }
}

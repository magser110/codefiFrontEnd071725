import { Component, EnvironmentInjector } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  user = {
		username: '',
		password: '',
		password_confirmation: '',
	};

	constructor(private authService: AuthenticationService, private router: Router) {}

	signup() {
		if (this.user.password === this.user.password_confirmation) {
			this.authService.signup(this.user).subscribe({
				next: (res: any) => {
					console.log('Sign up successful', res);
					// Redirect to login or another page
					this.router.navigate(['/login']);
				},
				error: (error: any) => {
					console.error('Sign up failed', error);
					// Handle error (e.g., show error message)
				},
			});
		} else {
			console.error('Passwords do not match');
			// Handle password mismatch (e.g., show error message)
		}
	}
}
//   signupForm = new FormGroup({
//     username: new FormControl('', Validators.required),
//     password: new FormControl('', Validators.required),
//     password_confirmation : new FormGroup('', Validators.required),
//   });

//   constructor(private authService: AuthenticationService, private router: Router){}

//   signup(){
//     this.authService.signup(this.signupForm.value).subscribe({
//       next: (data) => {
//         console.log(data);
//         this.router.navigate(['/login']);
//       },
//       error: (error) => {
//         console.error(error);
//       }
//     });
//   }

// }

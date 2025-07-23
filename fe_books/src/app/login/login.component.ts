import { Component } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthenticationService, private router: Router) {}

  login() {
    this.authService.login(this.username, this.password).subscribe({
      next:(res: any) => {
        console.log('logged in with token:', res.token);
        this.authService.setToken(res.token);
        this.router.navigate(['/books-list']);
      },
      error: (error: any) => {
        console.error('Login error', error)
      },
    });
  }

}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private readonly tokenSubject = new BehaviorSubject<string | null>(null);

  constructor(private http: HttpClient, private router: Router) { }

  signup(user: any) {
  return this.http.post('http://localhost:3000/users', user);
}

  login(username: string, password: string) {
    return this.http.post<{ token: string }>('http://localhost:3000/login', { username, password });
  }

  setToken(token: string) {
    localStorage.setItem('authToken', token);
    this.tokenSubject.next(token);
  }

  getToken(){
    return localStorage.getItem('authToken');
  }

  isLoggedIn(){
    return !!this.getToken();
  }

  logout(){
    localStorage.removeItem('authToken');
    this.tokenSubject.next(null);
    this.router.navigate(['/login']);
  }
}

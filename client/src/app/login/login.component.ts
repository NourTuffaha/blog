import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],

  standalone: true,
  imports: [FormsModule]
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    this.authService.login({ username: this.username, password: this.password }).subscribe(
      (res: any) => {
        localStorage.setItem('token', res.token);
         console.log('Token stored:', res.token);
        this.router.navigate(['/posts']);
      },
      (err: any) => {
        console.error('Login error:', err);
        alert('Login failed. Please try again.');
      }
    );
  }
}

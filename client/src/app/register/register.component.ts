import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  imports: [FormsModule]
})
export class RegisterComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

onSubmit(username: string, email: string, password: string, confirmPassword: string) {
  console.log(username, email, password, confirmPassword);
  if (password !== confirmPassword) {
    this.errorMessage = 'Passwords do not match';
    return;
  }

  const registerData = { username, email, password };

  this.authService.register(registerData).subscribe({
    next: () => {
      this.router.navigate(['/login']);
    },
    error: (error) => {
      this.errorMessage = error.message || 'An error occurred during registration';
    }
  });
}
}

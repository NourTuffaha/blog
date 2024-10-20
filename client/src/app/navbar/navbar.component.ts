import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  standalone: true,
  imports: [RouterModule],
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  userId: string | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.userId = this.authService.getUserId();
  }
}

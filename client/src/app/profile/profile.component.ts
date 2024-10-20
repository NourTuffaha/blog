import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service'; 
import { PostService } from '../services/post.service'; 
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface User {
  username: string;
  email: string;
}

interface Post {
  _id: string;
  title: string;
  content: string;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class ProfileComponent implements OnInit {
  user!: User | null;
  posts: Post[] = [];
  userId!: string;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private postService: PostService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.userId = params['id']; 
      this.loadUserProfile(this.userId);
    });
  }

  loadUserProfile(userId: string): void {
    this.authService.getUserProfile(userId).subscribe(
      (data) => {
        this.user = data.user;
        this.posts = data.posts;
      },
      (error) => {
        console.error('Error fetching user profile:', error);
      }
    );
  }
}

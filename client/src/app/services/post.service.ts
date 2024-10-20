import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Post {
  _id: string;
  title: string;
  content: string;
  userId: string;
  reactions: { [key: string]: number };
  comments: Comment[];
}

export interface Comment {
  _id: string;
  postId: string;
  userId: string;
  content: string;
  reactions: { [key: string]: number };
}

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private postsApiUrl = 'http://localhost:5000/api/posts';
  private commentsApiUrl = 'http://localhost:5000/api/comments';

  constructor(private http: HttpClient) {}

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.postsApiUrl);
  }

  createPost(post: Omit<Post, '_id'>): Observable<Post> {
    return this.http.post<Post>(this.postsApiUrl, post);
  }

  addComment(postId: string, comment: Omit<Comment, '_id'>): Observable<Comment> {
    return this.http.post<Comment>(`${this.commentsApiUrl}/${postId}/comment`, comment);
  }

  reactToPost(postId: string, reactionType: string): Observable<Post> {
    return this.http.post<Post>(`${this.postsApiUrl}/${postId}/react`, { reactionType });
  }

  reactToComment(commentId: string, reactionType: string): Observable<Comment> {
    return this.http.post<Comment>(`${this.commentsApiUrl}/comment/${commentId}/react`, { reactionType }); 
  }
}

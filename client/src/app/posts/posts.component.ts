import { Component, OnInit } from '@angular/core';
import { PostService, Post, Comment } from '../services/post.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule,]
})
export class PostsComponent implements OnInit {
  posts: Post[] = [];
 newPost: Omit<Post, '_id' | 'userId'> & { userId: string } = { title: '', content: '', reactions: {}, comments: [], userId: '' };
  // newComment: { content: string; userId: string } = { content: '', userId: '' };
  newComments: { [postId: string]: { content: string; userId: string } } = {};

  constructor(private postService: PostService, private authService: AuthService) {}

  ngOnInit(): void {
    this.loadPosts();
    this.authService.getToken(); 
    const userId = this.authService.getUserId() || '';
    this.newPost.userId = userId;
    //  this.newComment.userId = this.authService.getUserId() || ''

  }
  loadPosts(): void {
   
    this.postService.getPosts().subscribe((posts) => {
      this.posts = posts;
      posts.forEach(post => {
        this.newComments[post._id] = { content: '', userId: this.authService.getUserId() || '' };
      });
    });
  }

  createPost(): void {
    this.postService.createPost(this.newPost).subscribe((post) => {
      this.posts.unshift(post); 
      // unshift is opposite of push so it goes to the top instead of the bottom - client side was blocking - refresh was required - make sure of this
      this.newPost = { title: '', content: '', reactions: {}, comments: [], userId: '' }; 
    });
  }

addComment(postId: string): void {
    const newComment = this.newComments[postId];
    this.postService.addComment(postId, { 
      content: newComment.content, 
      reactions: {}, 
      userId: newComment.userId, 
      postId: ''
    }).subscribe((comment) => {
      const post = this.posts.find(p => p._id === postId);
      if (post) {
        post.comments.push(comment);
        this.newComments[postId].content = ''; // Reset comment input for that post
      }
    });
  }

  reactToPost(postId: string, reactionType: string): void {
    this.postService.reactToPost(postId, reactionType).subscribe((post) => {
      const index = this.posts.findIndex(p => p._id === postId);
      if (index !== -1) {
        this.posts[index] = post; 
      }
    });
  }

  reactToComment(commentId: string, reactionType: string): void {
  this.postService.reactToComment(commentId, reactionType).subscribe((updatedComment) => {
    this.posts.forEach(post => {
      const commentIndex = post.comments.findIndex(comment => comment._id === commentId);
      if (commentIndex !== -1) {
        post.comments[commentIndex] = updatedComment;
      }
    });
  });
}

}

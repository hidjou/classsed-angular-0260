import { Component, OnInit } from '@angular/core';
import { Post } from '../../interfaces';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-post-feed',
  templateUrl: './post-feed.component.html',
  styleUrls: ['./post-feed.component.css']
})
export class PostFeedComponent implements OnInit {
  posts: Post[];
  postLimit: number = 5;
  editingPost: Post = {
    body: '',
    title: ''
  };

  constructor(private postService: PostService) {}

  ngOnInit() {
    this.postService.getPosts().subscribe((posts) => {
      this.posts = posts;
    });
    if (localStorage.getItem('postLimit')) {
      this.postLimit = parseInt(localStorage.getItem('postLimit'));
    }
  }

  onPostAdded(newPost: Post) {
    if (this.posts.find((p) => p.id === newPost.id)) {
      const index = this.posts.findIndex((p) => p.id === newPost.id);
      this.posts.splice(index, 1, newPost);
    } else {
      this.posts.unshift(newPost);
    }
  }

  editPost(post: Post) {
    this.editingPost = post;
  }

  deletePost(id: string) {
    this.postService.deletePost(id).subscribe(() => {
      this.posts = this.posts.filter((post) => post.id !== id);
    });
  }

  setLimit() {
    localStorage.setItem('postLimit', this.postLimit.toString());
    this.postService
      .getNumberOfPosts(this.postLimit)
      .subscribe((posts) => (this.posts = posts));
  }
}

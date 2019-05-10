import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Post } from '../../interfaces';
import { NgForm } from '@angular/forms';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css']
})
export class PostFormComponent implements OnInit {
  @Output() addPostEvent: EventEmitter<Post> = new EventEmitter();
  @Input() post: Post;
  loading: boolean = false;

  constructor(private postService: PostService) {}

  ngOnInit() {}

  onSubmit(form: NgForm) {
    this.loading = true;
    this.postService.writePost(this.post).subscribe((post) => {
      this.addPostEvent.emit(post);
      this.post = {
        title: '',
        body: ''
      };
      this.loading = false;
    });
  }
}

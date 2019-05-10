import { Injectable } from '@angular/core';
import { Post } from '../interfaces';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  apiBaseUrl: string =
    'https://ndb99xkpdk.execute-api.eu-west-2.amazonaws.com/dev';
  options = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) {}

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.apiBaseUrl}/posts`);
  }

  getNumberOfPosts(limit: number): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.apiBaseUrl}/posts/${limit}`);
  }

  writePost(post: Post): Observable<Post> {
    if (post.id) {
      return this.http.put<Post>(
        `${this.apiBaseUrl}/post/${post.id}`,
        post,
        this.options
      );
    } else {
      return this.http.post<Post>(
        `${this.apiBaseUrl}/post`,
        post,
        this.options
      );
    }
  }

  deletePost(id: string): Observable<any> {
    return this.http.delete(`${this.apiBaseUrl}/post/${id}`);
  }
}

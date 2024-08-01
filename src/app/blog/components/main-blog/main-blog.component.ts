import { Component } from '@angular/core';
import { BlogService } from '../../services/blog.service';
import { map, Observable } from 'rxjs';
import { Blog } from '../../models/blog';

@Component({
  selector: 'app-main-blog',
  templateUrl: './main-blog.component.html',
  styleUrl: './main-blog.component.scss'
})
export class MainBlogComponent {
  blogs$: Observable<Blog[]>;

  constructor(private readonly blogService: BlogService) {
    this.blogs$ = this.blogService.getBlogMetadata().pipe(map(({ blogs }) => blogs.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())));
  }
}

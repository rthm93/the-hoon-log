import { Component, Input } from '@angular/core';
import { Blog } from '../../models/blog';

@Component({
  selector: 'app-main-blog-item',
  templateUrl: './main-blog-item.component.html',
  styleUrl: './main-blog-item.component.scss'
})
export class MainBlogItemComponent {
  @Input() public blog: Blog | undefined;
}

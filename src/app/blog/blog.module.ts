import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogService } from './services/blog.service';
import { Route, RouterModule } from '@angular/router';
import { MainBlogComponent } from './components/main-blog/main-blog.component';
import { SanitizeHtmlPipe } from '../shared/pipes/sanitize-html.pipe';
import { BlogComponent } from './components/blog/blog.component';
import { MainBlogHeaderComponent } from './components/main-blog-header/main-blog-header.component';

const routes: Route[] = [
  {
    path: '',
    component: MainBlogComponent,
  },
  {
    path: 'blogs',
    component: MainBlogComponent,
  },
  {
    path: 'blogs/:id',
    component: BlogComponent,
  }
];

@NgModule({
  declarations: [
    MainBlogComponent,
    BlogComponent,
    MainBlogHeaderComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
  ],
  providers: [
    BlogService,
    SanitizeHtmlPipe,
  ]
})
export class BlogModule { }

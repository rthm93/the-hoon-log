import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogService } from './services/blog.service';
import { Route, RouterModule } from '@angular/router';
import { MainBlogComponent } from './components/main-blog/main-blog.component';

const routes: Route[] = [
  {
    path: '',
    component: MainBlogComponent,
  }
];

@NgModule({
  declarations: [
    MainBlogComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
  ],
  providers: [
    BlogService,
  ]
})
export class BlogModule { }

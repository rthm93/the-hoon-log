import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./blog/blog.module').then(m => m.BlogModule),
  }
];

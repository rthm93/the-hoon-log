import { Component, OnDestroy, OnInit } from '@angular/core';
import { BlogService } from '../../services/blog.service';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, map, mergeMap, Observable, Subscription, tap } from 'rxjs';
import { Blog } from '../../models/blog';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss'
})
export class BlogComponent implements OnInit, OnDestroy {
  blog$ = new BehaviorSubject<Blog | undefined>(undefined);
  content$: Observable<string>;
  id$: Observable<string>;
  private subscriptions: Subscription[] = [];

  constructor(private readonly blogService: BlogService, private readonly route: ActivatedRoute) {
    this.id$ = route.params.pipe(map(p => p['id']));
    this.content$ = this.blog$.pipe(mergeMap(blog => this.blogService.getBlogHtmlById(blog?.id || '')));
  }

  ngOnDestroy(): void {
    for(let sub of this.subscriptions) {
      sub.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.id$.pipe(mergeMap(id => {
        return this.blogService.getBlogById(id).pipe(
          tap(blog => {
            this.blog$.next(blog);
          })
        )
      })).subscribe()
    );
  }
}

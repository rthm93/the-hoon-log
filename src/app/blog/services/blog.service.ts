import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, mergeMap, Observable, of, tap } from 'rxjs';
import { BlogMetadata } from '../models/blog-metadata';
import { Blog } from '../models/blog';
import { SanitizeHtmlPipe } from '../../shared/pipes/sanitize-html.pipe';

@Injectable()
export class BlogService {
  private blogMetadata$ = new BehaviorSubject<BlogMetadata | undefined>(undefined);

  constructor(private readonly http: HttpClient, private readonly sanitize: SanitizeHtmlPipe) { }

  getBlogMetadata(): Observable<BlogMetadata> {
    return this.blogMetadata$.pipe(
      mergeMap(metadata => {
        return metadata ? of(metadata) : this.http.get<BlogMetadata>('/blog/blogs.json').pipe(
          tap(m => this.blogMetadata$.next(m)),
        );
      })
    );
  }

  getBlogById(id: string): Observable<Blog | undefined> {
    return this.getBlogMetadata().pipe(
      map(metadata => (metadata?.blogs || []).find(b => b.id === id)),
      catchError(err => {
        console.error(err);
        return of(undefined);
      })
    );
  }

  getBlogHtmlById(id: string): Observable<string> {
    return this.getBlogById(id).pipe(mergeMap(blog => {
      if (!blog) {
        return of(`Blog '${id}' could not be found!`)
      }

      return this.http.get(blog!.src, { responseType: 'text' }).pipe(
        map(html => this.sanitize.transform(html))
      );
    }));
  }
}

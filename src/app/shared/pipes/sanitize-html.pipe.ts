import { Pipe, PipeTransform } from '@angular/core';
import sanitizeHtml from 'sanitize-html';

@Pipe({
  name: 'sanitizeHtml',
  standalone: true
})
export class SanitizeHtmlPipe implements PipeTransform {

  constructor() { }

  transform(html: string): string {
    const tempHtml = html || '';
    return sanitizeHtml(tempHtml);
  }

}

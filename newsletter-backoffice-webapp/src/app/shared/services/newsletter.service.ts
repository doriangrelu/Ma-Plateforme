import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CreatesNewsletter, Newsletter} from '../model/newsletter.model';
import {Observable} from 'rxjs';
import {PageRequest, PageResult} from '../model/page.model';

@Injectable({
  providedIn: 'root'
})
export class NewsletterService {

  private client = inject(HttpClient);

  public listAll({pageSize = 10, pageIndex = 0}: PageRequest): Observable<PageResult<Newsletter>> {
    return this.client.get<PageResult<Newsletter>>('http://localhost:1010/newsletters', {
      params: {size: pageSize, page: pageIndex}
    });
  }

  public details(newsletterId: string): Observable<Newsletter> {
    return this.client.get<Newsletter>('http://localhost:1010/newsletters/' + newsletterId);
  }

  public creates(createsNewsletter: CreatesNewsletter): Observable<void> {
    return this.client.post<void>('http://localhost:1010/newsletters', createsNewsletter);
  }

}

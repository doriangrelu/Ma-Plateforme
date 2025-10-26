import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CreatesNewsletter, Newsletter} from '../model/newsletter.model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsletterService {

  private client = inject(HttpClient);

  public listAll(): Observable<Newsletter[]> {
    return this.client.get<Newsletter[]>('http://localhost:1010/newsletters');
  }

  public creates(createsNewsletter: CreatesNewsletter): Observable<void> {
    return this.client.post<void>('http://localhost:1010/newsletters', createsNewsletter);
  }

}

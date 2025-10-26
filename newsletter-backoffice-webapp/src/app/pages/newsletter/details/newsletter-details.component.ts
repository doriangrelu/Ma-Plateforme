import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatAnchor} from '@angular/material/button';
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from '@angular/material/card';

@Component({
  selector: 'app-details',
  imports: [
    RouterLink,
    MatIconModule,
    MatAnchor,
    MatCard,
    MatCardContent,
    MatCardTitle,
    MatCardHeader
  ],
  templateUrl: './newsletter-details.component.html',
  styleUrl: './newsletter-details.component.scss'
})
export class NewsletterDetailsComponent implements OnInit {

  private readonly activatedRoute = inject(ActivatedRoute);

  ngOnInit(): void {
    console.debug('See details for newsletter: ', this.activatedRoute.snapshot.params['newsletterId']);
  }


}

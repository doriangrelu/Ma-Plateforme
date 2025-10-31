import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatAnchor, MatButton} from '@angular/material/button';
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from '@angular/material/card';
import {NewsletterService} from '../../../shared/services/newsletter.service';
import {Newsletter} from '../../../shared/model/newsletter.model';
import {LoaderService} from '../../../shared/services/loader.service';
import {AlertComponent} from '../../../shared/components/alert/alert.component';
import {MatList, MatListItem} from '@angular/material/list';
import {DatePipe} from '@angular/common';
import {Campaign} from '../../../shared/model/campaign.model';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable
} from '@angular/material/table';

@Component({
  selector: 'app-details',
  imports: [
    RouterLink,
    MatIconModule,
    MatAnchor,
    MatCard,
    MatCardContent,
    MatCardTitle,
    MatCardHeader,
    AlertComponent,
    MatList,
    MatListItem,
    DatePipe,
    MatButton,
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    MatTable,
    MatHeaderCellDef
  ],
  templateUrl: './newsletter-details.component.html',
  styleUrl: './newsletter-details.component.scss'
})
export class NewsletterDetailsComponent implements OnInit {

  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly newsletterService = inject(NewsletterService);
  private readonly loaderService = inject(LoaderService);

  protected error = "";

  protected newsletter: Newsletter | null = null;
  protected campaigns: Campaign[] = [];

  protected displayedColumns: string[] = ['name', 'enabled', 'sent', 'sentAt', 'createdAt', 'updatedAt', 'actions'];


  ngOnInit(): void {
    this.loaderService.addLoading();
    const newsletterId = this.activatedRoute.snapshot.params['newsletterId'];
    console.debug('See details for newsletter: ', newsletterId);

    this.newsletterService.details(newsletterId).subscribe({
      next: (event: Newsletter) => {
        console.debug("Resolved newsletter details: ", event)
        this.newsletter = event;
        this.loaderService.removeLoading();
      },
      error: (event) => {
        if (event.status === 404) {
          this.error = "Newsletter introuvable.";
        } else {
          this.error = "Une erreur inopinée est survenue.";
        }
        this.loaderService.removeLoading();
      }
    })

  }


}

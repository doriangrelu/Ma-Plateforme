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
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable
} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import {CreatesCampaignModalComponent} from './shared/creates-campaign-modal/creates-campaign-modal.component';
import {CampaignService} from '../../../shared/services/campaign.service';
import {DetailsCampaignModalComponent} from './shared/details-campaign-modal/details-campaign-modal.component';

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
    MatHeaderCellDef,
  ],
  templateUrl: './newsletter-details.component.html',
  styleUrl: './newsletter-details.component.scss'
})
export class NewsletterDetailsComponent implements OnInit {

  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly newsletterService = inject(NewsletterService);
  private readonly campaignService = inject(CampaignService);
  private readonly loaderService = inject(LoaderService);
  private readonly dialog = inject(MatDialog);

  protected isLoading = this.loaderService.getIsLoading();
  protected error = "";
  protected newsletter: Newsletter | null = null;
  protected campaigns: Campaign[] = [];
  protected displayedColumns: string[] = ['name', 'enabled', 'sent', 'sentAt', 'createdAt', 'updatedAt', 'actions'];

  private newsletterId!: string;

  ngOnInit(): void {
    this.newsletterId = this.activatedRoute.snapshot.params['newsletterId'];
    console.debug('See details for newsletter: ', this.newsletterId);
    this.resfreshData(this.newsletterId);
  }

  private resfreshData(newsletterId: string) {
    this.loaderService.addLoadingNumber(2);
    this.newsletterService.details(newsletterId)
      .subscribe({
        next: (event: Newsletter) => {
          console.debug("Resolved newsletter details: ", event)
          this.newsletter = event;
        },
        error: (event) => {
          if (event.status === 404) {
            this.error = "Newsletter introuvable.";
          } else {
            this.error = "Une erreur inopinée est survenue.";
          }
        }
      })
      .add(() => this.loaderService.removeLoading());

    this.campaignService.listAll(newsletterId, {
      pageIndex: 0, pageSize: 100
    }).subscribe({
      next: (event: Campaign[]) => {
        this.campaigns = event;
      },
      error: (event) => {
        console.error(event);
      }
    })
      .add(() => this.loaderService.removeLoading());
  }

  protected createCampaign() {
    const modalRef = this.dialog.open(CreatesCampaignModalComponent, {
      width: '90vw',
      height: '80vh',
      maxWidth: '100vw',
      maxHeight: '100vh',
      panelClass: 'dialog-grande',
      data: {
        newsletter: this.newsletter?.id,
      }
    });
    modalRef.afterClosed().subscribe(result => {
      this.resfreshData(this.newsletterId);
    });
  }

  protected detailCampaign(campaign: Campaign) {
    this.dialog.open(DetailsCampaignModalComponent, {
      width: '90vw',
      height: '80vh',
      maxWidth: '100vw',
      maxHeight: '100vh',
      panelClass: 'dialog-grande',
      data: {
        campaign: campaign
      }
    })
  }

}

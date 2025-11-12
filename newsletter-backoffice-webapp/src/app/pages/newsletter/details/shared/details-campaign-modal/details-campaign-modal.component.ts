import {Component, inject, OnInit, ViewChild} from '@angular/core';
import {EmailEditorComponent, EmailEditorModule} from "angular-email-editor";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {LoaderService} from '../../../../../shared/services/loader.service';
import {ToasterService} from '../../../../../shared/services/toaster.service';
import {CampaignService} from '../../../../../shared/services/campaign.service';
import {Campaign} from '../../../../../shared/model/campaign.model';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-details-campaign-modal',
  imports: [
    EmailEditorModule,
    FormsModule,
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle,
    ReactiveFormsModule,
    MatButton
  ],
  templateUrl: './details-campaign-modal.component.html',
  styleUrl: './details-campaign-modal.component.scss'
})
export class DetailsCampaignModalComponent implements OnInit {

  @ViewChild(EmailEditorComponent)
  private emailEditor!: EmailEditorComponent;

  protected readonly scriptUrl = 'https://editor.unlayer.com/embed.js?2';
  protected readonly options: EmailEditorComponent['options'] = {
    locale: 'fr-FR',
    safeHtml: true,
    version: 'latest',
    appearance: {
      theme: 'modern_dark',
    },
    fonts: {
      showDefaultFonts: true
    },
    features: {
      sendTestEmail: true
    }
  };

  private readonly data = inject<{ campaign: Campaign }>(MAT_DIALOG_DATA);

  private readonly dialogRef = inject(MatDialogRef<DetailsCampaignModalComponent>);
  private readonly loaderService = inject(LoaderService);
  private readonly toasterService = inject(ToasterService);
  private readonly campaignService = inject(CampaignService);

  protected campaign: Campaign | null = null;

  ngOnInit(): void {
    this.campaign = this.data.campaign;
  }

  protected close() {
    this.dialogRef.close();
  }

  protected editorLoaded() {
    if (this.campaign?.design) {
      console.log("LOADED DESIGN: ", this.campaign?.design);
    }
  }

  protected editorReady() {
    this.dialogRef.disableClose = false;
  }

}

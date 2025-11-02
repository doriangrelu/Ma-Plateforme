import {ChangeDetectionStrategy, Component, inject, OnInit, ViewChild} from '@angular/core';
import {EmailEditorComponent, EmailEditorModule} from 'angular-email-editor';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatFormField, MatHint, MatInput, MatInputModule, MatLabel} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatButton} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {AlertComponent} from '../../../../../shared/components/alert/alert.component';
import {LoaderService} from '../../../../../shared/services/loader.service';
import {CampaignService} from '../../../../../shared/services/campaign.service';
import {CreatesCampaign} from '../../../../../shared/model/campaign.model';
import {ToasterService} from '../../../../../shared/services/toaster.service';

@Component({
  selector: 'app-creates-campaign-modal',
  imports: [
    EmailEditorModule,
    MatDialogContent,
    MatDialogTitle,
    MatDialogActions,
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatLabel,
    MatFormField,
    MatHint,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatButton,
    AlertComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './creates-campaign-modal.component.html',
  styleUrl: './creates-campaign-modal.component.scss'
})
export class CreatesCampaignModalComponent implements OnInit {

  //https://www.npmjs.com/package/angular-email-editor

  private readonly data = inject<{ newsletter: string }>(MAT_DIALOG_DATA);
  private readonly formBuilder = inject(FormBuilder);
  private readonly dialogRef = inject(MatDialogRef<CreatesCampaignModalComponent>);
  private readonly loaderService = inject(LoaderService);
  private readonly toasterService = inject(ToasterService);
  private readonly campaignService = inject(CampaignService);


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

  protected error: string | null = null;
  protected minDate = new Date();

  protected readonly createsCampaignForm = this.formBuilder.group({
    name: ['', Validators.required, Validators.maxLength(255)],
    description: ['', Validators.required, Validators.maxLength(500)],
    sendAt: [[], Validators.required],
    enabled: [true, Validators.required],
  })

  // @ts-ignore
  @ViewChild(EmailEditorComponent)
  private editor: EmailEditorComponent | undefined;

  ngOnInit(): void {
    this.dialogRef.disableClose = true;
  }

  protected editorLoaded() {
    console.debug('editorLoaded');
  }

  protected editorReady() {
    this.dialogRef.disableClose = false;
  }

  protected cancel() {
    this.dialogRef.close();
  }

  protected async submit() {
    this.error = null;
    if (this.createsCampaignForm.invalid) {
      this.error = "Veuillez compléter le formulaire"
    }
    this.loaderService.addLoading();
    this.dialogRef.disableClose = true;

    const raw = this.createsCampaignForm.value;

    const design: string = await this.exportDesign();
    const content: string = await this.exportHtml();

    const payload = {
      name: this.createsCampaignForm.value.name!,
      description: this.createsCampaignForm.value.description!,
      sendAt: this.createsCampaignForm.value.sendAt!,
      enabled: true,
      design: design,
      content: content
    } as CreatesCampaign;

    this.campaignService.creates(this.data.newsletter, payload).subscribe({
      next: result => {
        this.toasterService.success("Campagne créée avec succès !");
        this.loaderService.removeLoading();
        this.dialogRef.disableClose = false;
        this.dialogRef.close();
      },
      error: error => {
        if (error.status === 409) {
          this.error = "Une campagne portant le même nom existe déjà";
        } else if (error.status === 400) {
          this.error = "Merci de compléter le formulaire correctement";
        } else {
          this.error = "Une erreur inopinée est survenue...";
        }
      }
    })

    console.debug("Payload: ", payload);

  }

  private exportHtml(): Promise<string> {
    return new Promise((resolve, reject) => {
      this.unlayer.exportHtml(data => {
        resolve(data.html);
      })
    });
  }

  private exportDesign(): Promise<string> {
    return new Promise((resolve, reject) => {
      this.unlayer.saveDesign((data: any) => {
        resolve(JSON.stringify(data));
      })
    });
  }

  private get unlayer() {
    return this.editor!.editor;
  }

}

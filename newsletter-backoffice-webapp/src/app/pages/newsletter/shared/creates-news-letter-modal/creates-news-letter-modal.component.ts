import {Component, inject} from '@angular/core';
import {MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle} from '@angular/material/dialog';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckbox} from '@angular/material/checkbox';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {NewsletterService} from '../../../../shared/services/newsletter.service';
import {CreatesNewsletter} from '../../../../shared/model/newsletter.model';
import {AlertComponent} from '../../../../shared/components/alert/alert.component';
import {LoaderService} from '../../../../shared/services/loader.service';
import {ToasterService} from '../../../../shared/services/toaster.service';


@Component({
  selector: 'app-creates-news-letter-modal',
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatButtonModule,
    MatFormField,
    MatLabel,
    MatInput,
    MatDialogActions,
    MatCheckbox,
    ReactiveFormsModule,
    AlertComponent
  ],
  templateUrl: './creates-news-letter-modal.component.html',
  styleUrl: './creates-news-letter-modal.component.css'
})
export class CreatesNewsLetterModalComponent {

  private readonly newsletterService = inject(NewsletterService);
  private readonly loaderService = inject(LoaderService);
  private readonly toasterService = inject(ToasterService);
  private readonly formBuilder = inject(FormBuilder);
  private readonly dialogRef = inject(MatDialogRef<CreatesNewsLetterModalComponent>);

  protected errorMessage = "";

  // readonly data = inject<DialogData>(MAT_DIALOG_DATA);
  // readonly animal = model(this.data.animal);

  createsNewsletterForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.maxLength(255)]],
    enabled: [true, [Validators.required]],
  });

  onSubmit() {
    if (this.createsNewsletterForm.valid) {
      this.loaderService.addLoading();
      this.dialogRef.disableClose = true;
      this.errorMessage = "";
      this.createsNewsletterForm.disable();
      this.newsletterService.creates(this.createsNewsletterForm.getRawValue() as CreatesNewsletter)
        .subscribe(
          {
            next: result => {
              this.createsNewsletterForm.reset();
              this.dialogRef.close();
              this.toasterService.success('Newsletter créée avec succès !')
              this.handleEnd();
            },
            error: (error) => {
              if (error.status === 409) {
                this.errorMessage = "Une newsletter portant le même nom existe déjà.";
              } else if (error.status === 400) {
                this.errorMessage = "Merci de compléter le formulaire correctement";
              } else {
                this.errorMessage = "Une erreur inopinée est survenue";
              }
              this.handleEnd();
            }
          });
    } else {
      this.errorMessage = "Veuillez compléter le formulaire";
    }
  }

  private handleEnd() {
    this.loaderService.removeLoading();
    this.dialogRef.disableClose = true;
    this.createsNewsletterForm.enable();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

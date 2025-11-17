import {Component, inject} from '@angular/core';
import {EmailEditorModule} from "angular-email-editor";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle} from "@angular/material/dialog";
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: 'app-mail-editor-add-block-modal',
  imports: [
    EmailEditorModule,
    FormsModule,
    MatButton,
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle,
    ReactiveFormsModule,
    EmailEditorModule,
    MatDialogContent,
    MatDialogTitle,
    MatDialogActions,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatButton
  ],
  templateUrl: './mail-editor-add-block-modal.component.html',
  styleUrl: './mail-editor-add-block-modal.component.scss',
})
export class MailEditorAddBlockModalComponent {

  private dialogRef: MatDialogRef<MailEditorAddBlockModalComponent> = inject(MatDialogRef<MailEditorAddBlockModalComponent>);

  protected readonly layouts: Layout[] = [
    {
      column: 1,
      name: '100%'
    },
    {
      column: 2,
      name: '50%'
    },
    {
      column: 3,
      name: '33%'
    }
  ];

  protected range(number: number) {
    return Array.from({length: number}, (_, i) => i);
  }

  protected select(type: number) {
    this.dialogRef.close(type);
  }

}

interface Layout {
  column: number;
  name: string;
}

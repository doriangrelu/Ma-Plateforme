import { Component } from '@angular/core';
import {MailEditorComponent} from '../../shared/components/mail-editor/mail-editor.component';

@Component({
  selector: 'app-templates',
  imports: [
    MailEditorComponent
  ],
  templateUrl: './templates.component.html',
  styleUrl: './templates.component.scss',
})
export class TemplatesComponent {

}

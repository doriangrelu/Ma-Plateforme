import {Component, signal} from '@angular/core';
import {Block, EmailDoc, MailElement} from '../../model/maileditor.model';
import {FormsModule} from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';

type PaletteItem =
  | { type: 'block', layout: Block['layout'], label: string }
  | { type: 'element', kind: MailElement['kind'], label: string };

@Component({
  selector: 'app-mail-editor',
  imports: [
    FormsModule,
    MatIconModule,
  ],
  templateUrl: './mail-editor.component.html',
  styleUrl: './mail-editor.component.scss'
})
export class MailEditorComponent {
  doc = signal<EmailDoc>({subject: 'Ma campagne', blocks: []});

}

import {Component, inject, input} from '@angular/core';
import {Column, HeadingEl, ImageEl, LinkEl, TextEl} from '../../../../../model/maileditor.model';
import {ToasterService} from '../../../../../services/toaster.service';
import {v4 as uuidv4} from 'uuid';
import {MailEditorTextColumnComponent} from './mail-editor-text-column/mail-editor-text-column.component';
import {MailEditorTitleColumnComponent} from './mail-editor-title-column/mail-editor-title-column.component';
import {MailEditorImageColumnComponent} from './mail-editor-image-column/mail-editor-image-column.component';
import {MailEditorLinkColumnComponent} from './mail-editor-link-column/mail-editor-link-column.component';


@Component({
  selector: 'app-mail-editor-column-renderer',
  imports: [
    MailEditorTextColumnComponent,
    MailEditorTitleColumnComponent,
    MailEditorImageColumnComponent,
    MailEditorLinkColumnComponent
  ],
  templateUrl: './mail-editor-column-renderer.component.html',
  styleUrl: './mail-editor-column-renderer.component.scss',
})
export class MailEditorColumnRendererComponent {

  private readonly toasterService = inject(ToasterService);

  public column = input.required<Column>()

  protected onDragover(event: DragEvent): void {
    event.preventDefault();
  }

  protected onDropElement(event: DragEvent, column: Column): void {
    if (column.element) {
      this.toasterService.warning("Attention, cette colone contient déjà un élément")
    } else {
      switch (event.dataTransfer?.getData('elementType')) {
        case 'text':
          column.element = {
            id: uuidv4(),
            html: '',
            kind: 'text'
          } as TextEl;
          break;
        case 'heading':
          column.element = {
            id: uuidv4(),
            level: 1,
            align: 'left',
            kind: 'heading'
          } as HeadingEl;
          break;
        case 'image':
          column.element = {
            id: uuidv4(),
            alt: '',
            src: '',
            kind: 'image'
          } as ImageEl;
          break;
        case 'link':
          column.element = {
            id: uuidv4(),
            href: '',
            text: '',
            kind: 'link'
          } as LinkEl;
          break;
      }
    }

    console.log("column");

  }

  protected readonly JSON = JSON;
}

import {Component, inject, signal, WritableSignal} from '@angular/core';
import {Block, Column, Lib, MailElement} from '../../model/maileditor.model';
import {FormsModule} from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {CdkDropList} from '@angular/cdk/drag-drop';
import {MatButton} from '@angular/material/button';
import {MatDialog} from '@angular/material/dialog';
import {
  MailEditorAddBlockModalComponent
} from './modal/mail-editor-add-block-modal/mail-editor-add-block-modal.component';
import {v4 as uuidv4} from 'uuid';
import {ToasterService} from '../../services/toaster.service';
import {MailEditorLayoutComponent} from './block/mail-editor-layout/mail-editor-layout.component';
import {MatTab, MatTabGroup} from '@angular/material/tabs';


type PaletteItem =
  | { type: 'block', layout: Block['layout'], label: string }
  | { type: 'element', kind: MailElement['kind'], label: string };

@Component({
  selector: 'app-mail-editor',
  imports: [
    FormsModule,
    MatIconModule,
    CdkDropList,
    MatButton,
    MailEditorLayoutComponent,
    MatTabGroup,
    MatTab,
  ],
  templateUrl: './mail-editor.component.html',
  styleUrl: './mail-editor.component.scss'
})
export class MailEditorComponent {

  private readonly toasterService = inject(ToasterService);
  private readonly dialog = inject(MatDialog);

  protected blocks: WritableSignal<Block[]> = signal([]);

  protected libs: Lib[] = [
    {
      icon: 'titlecase',
      label: 'Titre',
      type: 'heading'
    },
    {
      icon: 'toc',
      label: 'Texte',
      type: 'text'
    },
    {
      icon: 'image',
      label: 'Image',
      type: 'image'
    },
    {
      icon: 'link',
      label: 'Bouton lien',
      type: 'link'
    },
  ];

  protected addBlock() {
    this.dialog.open(MailEditorAddBlockModalComponent, {}).afterClosed().subscribe(result => {
      if (result) {
        let block: '1col' | '2col' | '3col';
        switch (result) {
          case 1:
            block = '1col';
            break;
          case 2:
            block = '2col';
            break;
          case 3:
            block = '3col';
            break;
        }
        const columns: Column[] = [];
        for (let i = 0; i < result; i++) {
          columns.push({
            id: uuidv4(),
            element: null
          });
        }
        this.blocks.update(value => {
          value.push({
            id: uuidv4(),
            layout: block,
            columns: columns,
            backgroundColor: 'red',
            padding: '1px'
          });
          return value;
        })
      }
    });
  }

  protected deleteBlock(block: Block): void {
    this.blocks.update(value => {
      return value.filter(item => item.id !== block.id);
    })
  }

  protected onDragstart(event: DragEvent, elementType: string): void {
    event.dataTransfer?.setData('elementType', elementType);
  }

}

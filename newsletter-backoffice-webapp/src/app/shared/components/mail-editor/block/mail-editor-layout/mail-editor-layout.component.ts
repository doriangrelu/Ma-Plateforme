import {Component, input, output} from '@angular/core';
import {CdkDrag, CdkDragDrop, CdkDragHandle, CdkDropList, moveItemInArray} from '@angular/cdk/drag-drop';
import {Block} from '../../../../model/maileditor.model';
import {MailEditorColumnRendererComponent} from './mail-editor-column-renderer/mail-editor-column-renderer.component';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-mail-editor-layout',
  imports: [
    CdkDropList,
    CdkDrag,
    MailEditorColumnRendererComponent,
    CdkDragHandle,
    MatIconModule
  ],
  templateUrl: './mail-editor-layout.component.html',
  styleUrl: './mail-editor-layout.component.scss',
})
export class MailEditorLayoutComponent {

  public onDeleteBlock = output<Block>();
  public blocks = input<Block[]>([]);

  protected blockDropped(event: CdkDragDrop<Block[]>): void {
    moveItemInArray(this.blocks(), event.previousIndex, event.currentIndex);
  }

  protected deleteBlock(block: Block): void {
    this.onDeleteBlock.emit(block);
  }

}

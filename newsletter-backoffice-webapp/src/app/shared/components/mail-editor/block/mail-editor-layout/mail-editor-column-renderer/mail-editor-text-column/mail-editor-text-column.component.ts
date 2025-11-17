import {Component, inject, OnDestroy, OnInit, output, OutputEmitterRef} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Editor, NgxEditorComponent, NgxEditorMenuComponent, Toolbar} from 'ngx-editor';
import {ToasterService} from '../../../../../../services/toaster.service';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-mail-editor-text-column',
  imports: [
    FormsModule,
    NgxEditorMenuComponent,
    NgxEditorComponent,
    MatButton
  ],
  templateUrl: './mail-editor-text-column.component.html',
  styleUrl: './mail-editor-text-column.component.scss',
})
export class MailEditorTextColumnComponent implements OnInit, OnDestroy {

  public content: OutputEmitterRef<string> = output();

  private readonly sanitizer = inject(DomSanitizer);
  private readonly toasterService = inject(ToasterService);

  protected inModificationMode: boolean = false;
  protected editor!: Editor;
  protected htmlContent: string = '<p style="color: red">Votre texte ici</p>';
  protected safeHtml: SafeHtml = this.sanitizer.bypassSecurityTrustHtml(this.htmlContent);


  protected readonly toolbar: Toolbar = [
    // default value
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    // ['ordered_list', 'bullet_list'],
    // [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    // or, set options for link:
    // [{ link: { showOpenInNewTab: false } }, 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
    ['horizontal_rule', 'format_clear', 'indent', 'outdent'],
    ['superscript', 'subscript'],
    ['undo', 'redo'],
  ];
  protected readonly colorPresets = [
    '#000000', // black
    '#333333',
    '#666666',
    '#999999',
    '#CCCCCC',
    '#FFFFFF',

    '#FF0000',
    '#CC0000',
    '#990000',
    '#FF6666',

    '#FF7F00',
    '#FFAA00',
    '#FFCC00',
    '#FFE680',

    '#FFFF00',
    '#CCCC00',
    '#999900',

    '#00FF00',
    '#00CC00',
    '#009900',
    '#66FF66',

    '#00FFFF',
    '#00CCCC',
    '#009999',
    '#66FFFF',

    '#0000FF',
    '#0000CC',
    '#000099',
    '#6666FF',
    '#AED6F1', // bleu clair
    '#5DADE2', // bleu moyen
    '#2471A3', // bleu foncé
    '#D7BDE2', // violet clair
    '#A569BD', // violet moyen
    '#6C3483', // violet foncé

    '#F5C6CE', // rose clair
    '#EC407A', // rose moyen
    '#C2185B', // rose foncé
    '#8A2BE2', // blueviolet
    '#9932CC',
    '#CC66FF',

    '#FF00FF',
    '#CC00CC',
    '#990099',
    '#FF66FF',

    '#D7CCC8', // marron clair
    '#A1887F', // marron moyen
    '#6D4C41', // marron foncé

    '#A52A2A', // brown
    '#8B4513',
    '#D2691E',
    '#FAD7A0', // orange clair
    '#F5B041', // orange moyen
    '#D68910', // orange foncé
    '#F5B7B1', // rouge clair
    '#EC7063', // rouge moyen
    '#CB4335', // rouge foncé
    '#FCF3CF', // jaune clair
    '#F7DC6F', // jaune moyen
    '#B7950B', // jaune foncé

    '#708090', // slate gray
    '#2F4F4F',  // dark slate gray
    '#ABEBC6', // vert clair
    '#58D68D', // vert moyen
    '#239B56', // vert foncé

    '#A3E4D7', // aqua clair
    '#48C9B0', // aqua moyen
    '#138D75', // aqua foncé

    '#E0E0E0', // gris clair
    '#9E9E9E', // gris moyen
    '#616161', // gris foncé

    '#F2F2F2', // light gray
    '#E8E8E8', // soft gray
    '#DDE7F0', // pastel blue-gray
    '#D6EAF8', // light sky blue
    '#E8DAEF', // pastel lavender
    '#FADBD8', // soft salmon pink
    '#FCF3CF', // light vanilla
    '#E8F8F5', // soft mint
    '#FDEDEC', // rose mist
    '#EBF5FB'  // baby blue
  ];

  ngOnInit(): void {
    this.editor = new Editor();
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }

  protected change(event: string) {
    this.htmlContent = event;
    this.safeHtml = this.sanitizer.bypassSecurityTrustHtml(this.htmlContent);
  }

  protected startUpdate() {
    this.inModificationMode = true;
  }

  protected endUpdate() {
    console.debug('endUpdate: ', this.htmlContent);

    if (this.htmlContent.trim().length === 0 || this.htmlContent === '<p></p>') {
      this.toasterService.warning("Vous devez insérer du contenu...", "Ok")
    } else {
      this.inModificationMode = false;
      this.content.emit(this.htmlContent);
    }
  }

}

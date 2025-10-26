import {Component, inject, OnInit, signal, WritableSignal} from '@angular/core';
import {NewsletterService} from '../../shared/services/newsletter.service';
import {Newsletter} from '../../shared/model/newsletter.model';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable
} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import {CreatesNewsLetterModalComponent} from './shared/creates-news-letter-modal/creates-news-letter-modal.component';
import {MatButton} from '@angular/material/button';
import {MatPaginatorModule, PageEvent} from '@angular/material/paginator';
import {Page, PageRequest} from '../../shared/model/page.model';

@Component({
  selector: 'app-newsletter',
  imports: [
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatHeaderCellDef,
    MatCellDef,
    MatHeaderRowDef,
    MatRowDef,
    MatRow,
    MatHeaderRow,
    MatButton,
    MatPaginatorModule
  ],
  templateUrl: './newsletter.component.html',
  styleUrl: './newsletter.component.css'
})
export class NewsletterComponent implements OnInit {

  private readonly newsletterService = inject(NewsletterService);
  private readonly dialog = inject(MatDialog);

  protected displayedColumns: string[] = ['name', 'enabled', 'createdAt', 'updatedAt'];


  protected newsletters: Newsletter[] = [];
  protected page: WritableSignal<Page> = signal({
    currentPage: 0,
    pageSize: 10,
    totalPages: 0,
    totalElements: 0,
  });

  ngOnInit(): void {
    this.refreshList();
  }

  private refreshList() {
    const pageRequest: PageRequest = {
      pageSize: this.page().pageSize,
      pageIndex: this.page().currentPage
    };

    this.newsletterService.listAll(pageRequest).subscribe(value => {
      this.newsletters = value.content;

      this.page.update(item => {
        return {...item, totalPages: value.page.totalPages, totalElements: value.page.totalElements}
      })

      console.debug("Newsletters page: ", this.page);
      console.debug("Newsletters content: ", this.newsletters);
    });
  }

  protected openCreatesModel() {
    const modalRef = this.dialog.open(CreatesNewsLetterModalComponent);
    modalRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.refreshList();
    });
  }

  protected onChangePageOptions(pageEvent: PageEvent) {
    this.page.update(value => {
      const targetPageIndex = value.pageSize !== pageEvent.pageSize ? 0 : pageEvent.pageIndex;
      const targetPageSize = pageEvent.pageSize;

      return {...value, pageSize: targetPageSize, currentPage: targetPageIndex}
    });
    this.refreshList();
  }

}

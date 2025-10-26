import {Component, inject, OnInit} from '@angular/core';
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
import {MatPaginatorModule} from '@angular/material/paginator';

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


  ngOnInit(): void {
    this.refreshList();
  }

  private refreshList() {
    this.newsletterService.listAll().subscribe(value => {
      this.newsletters = value;
      console.log("Newsletters: ", this.newsletters);
    });
  }

  protected openCreatesModel() {
    const modalRef = this.dialog.open(CreatesNewsLetterModalComponent);
    modalRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.refreshList();
    });
  }


}

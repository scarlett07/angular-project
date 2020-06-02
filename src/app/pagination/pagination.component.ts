import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  /**
   * The total amount of items within the collection
   */
  @Input() totalPages: number;

  /**
   * Alineacion
   */
  @Input() alignment: string;

  /**
   * Send to page selected
   */
  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();

  /**
   * pagina activa
   */
  currentPage = 1;

  /**
   *
   */
  pages: Array<any>;



  inicio: number;
  fin: number;

  constructor() { }

  ngOnInit() {
    this.inicio = 0;
    this.fin = 9;
    this.pages = Array(this.totalPages).fill(0).map((e, i) => i + 1 );
  }

  selectPage(page: number ) {
    event.preventDefault();
    this.currentPage = page;
    this.pageChange.emit(this.currentPage);
    if (this.totalPages > 9 ) {
      if ( this.currentPage <= 5 ) {
        this.inicio = 0;
        this.fin = 9;
      } else if ((this.totalPages - this.currentPage) < 5) {
        this.inicio = this.totalPages - 9;
        this.fin = this.totalPages;
      } else {
        this.inicio = this.currentPage - 5;
        this.fin = this.currentPage + 4;
      }
    }
    console.log(page);
  }
}

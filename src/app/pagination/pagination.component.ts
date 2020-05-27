import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit, OnChanges {

  /**
   * The total amount of items within the collection
   */
  @Input() totalPages: number;

  /**
   * Alineacion
   */
  @Input() alignment: string;

  /**
   *
   */
  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();

  /**
   * pagina activa
   */
  currentPage = 1;

  /**
   * dezplazamiento para cuando seleccionen un numero en particular
   */
  offset: number;

  /**
   * the max number of page links to display in the pagination
   */
  rango: number;

  /**
   *
   */
  pages: Array<any>;

  /**
   *
   */
  initialPage = 1;


  constructor() { }

  ngOnInit() {
    this.generatePages(this.initialPage);
  }

  generatePages(initialPage: number) {
    if (initialPage === 1) {
      this.rango = this.totalPages;
      this.pages = Array(this.totalPages).fill(0).map((e, i) => i + initialPage );
    } else {
      if (this.rango >= 9 ) {
        this.pages = Array(this.rango).fill(0).map((e, i) => i + initialPage );
      }
    }
  }

  ngOnChanges() {
  }

  nextPage(event) {
    event.preventDefault();
    if (!(this.currentPage === this.totalPages)) {
      if (this.currentPage < this.totalPages) {
        this.currentPage = this.currentPage + 1;
      }
      if (this.currentPage > 5 ) {
        this.initialPage = this.initialPage + 1;
        this.rango = this.rango - 1;
        this.generatePages(this.initialPage);
      }
    }
    this.pageChange.emit(this.currentPage);
  }

  previousPage(event) {
    event.preventDefault();
    if (this.currentPage > 1 ) {
      this.currentPage = this.currentPage - 1;
      if (this.currentPage >= 5) {
        this.initialPage = this.initialPage - 1;
        this.rango = this.rango + 1;
        this.generatePages(this.initialPage);
      }
    }
    this.pageChange.emit(this.currentPage);
  }


  selectPage(page: number ) {
    this.currentPage = page;
    
  }
}

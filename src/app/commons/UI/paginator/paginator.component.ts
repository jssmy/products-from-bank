import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
  standalone: true,
  imports: [
    CommonModule
  ]
})
export class PaginatorComponent implements OnChanges, OnInit{
  @Input() display = 5;
  @Input() total = 10;
  @Input() page = 1;
  @Output() change = new EventEmitter<number>();
  private paginatorsCount = 0;
  items = [];

  onChange(index: number) {
    this.page = index + 1;
    this.change.emit(this.page);
  }

  ngOnInit(): void {
    this.paginatorsCount = Math.ceil(this.total / this.display);
    this.items = Array(this.paginatorsCount).fill(1);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.ngOnInit();
  }
}

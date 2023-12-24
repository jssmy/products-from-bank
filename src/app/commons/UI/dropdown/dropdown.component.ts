import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonOption } from '../../interfaces/button-option';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
  standalone: true,
  imports: [
    CommonModule
  ]
})
export class DropdownComponent {
  showItems = false;
  @Input() items: ButtonOption[] = [];
  @Output() onChange = new EventEmitter<string>;
  onShow() {
    this.showItems = !this.showItems;
  }

  change(key: string) {
    this.onChange.emit(key);
  }
  
}

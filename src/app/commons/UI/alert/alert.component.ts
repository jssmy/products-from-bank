import { Component } from '@angular/core';
import { Alert } from '../../interfaces/alert';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
  standalone: true,
  imports: [
    CommonModule
  ]
})
export class AlertComponent {
  config: Alert;

  onDismis = new Subject<boolean>();


  onClick(confirm: boolean) {
    this.onDismis.next(confirm);
  }
}

import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Error} from '../../../core/models/error.model';


@Component({
  selector: 'app-error-dialog',
  templateUrl: './error-dialog.component.html',
  styleUrls: ['./error-dialog.component.scss']
})
export class ErrorDialogComponent {
  @Input() error: Error;
  @Output() closeDialog: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }


  closeError() {
    this.closeDialog.emit(true);
  }
}

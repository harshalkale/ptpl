import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.css']
})
export class ConfirmationModalComponent {
  @Input() confirmSubmitHandler;
  @Input() cancelSubmitHandler;

  confirmSubmit() {
    this.confirmSubmitHandler();
  }

  cancelSubmit() {
    this.cancelSubmitHandler();
  }
}

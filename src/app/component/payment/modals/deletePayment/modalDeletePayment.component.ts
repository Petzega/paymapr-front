import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PaymentShared } from '../../../shared/paymentShared.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-delete-payment',
  standalone: true,
  imports: [FormsModule],
  templateUrl: 'modalDeletePayment.component.html',
  styleUrls: ['modalDeletePayment.component.css'],
})
export class DeletePaymentComponent implements OnInit {
  personData: any = {};

  constructor(
    private paymentShared: PaymentShared,
    private deletePaymentModal: NgbModal
  ) {}

  ngOnInit(): void {}

  closeModal() {
    this.deletePaymentModal.dismissAll();
  }

  deletePayment() {
    this.paymentShared.dropPaymentById(this.paymentShared.pagoId).subscribe(() => {
      this.paymentShared.notifyTableEdited();
    });
    this.closeModal();
  }
}

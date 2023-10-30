import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PaymentShared } from '../../../shared/paymentShared.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PersonShared } from 'src/app/component/shared/personShared.service';
import { NgFor, NgIf, CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-payment',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule, CommonModule],
  templateUrl: 'modalEditPayment.component.html',
  styleUrls: ['modalEditPayment.component.css'],
})
export class EditPaymentComponent implements OnInit {

  users: any[] = [];

  personData: any[] = [];
  paymentData: any = {};

  constructor(
    private paymentShared: PaymentShared,
    private personShared: PersonShared,
    private editPersonModal: NgbModal
  ) {}

  ngOnInit(): void {
    this.paymentShared.getPaymentById(this.paymentShared.pagoId).subscribe((data) => {
      this.paymentData = data;
    });
    this.getAllPerson();
  }

  getAllPerson() {
    this.personShared.getAllItems().subscribe((data) => {
      this.users = data;
    });
  }

  closeModal() {
    this.editPersonModal.dismissAll();
  }

  editPerson() {
    this.paymentShared
      .updatePayment(this.paymentShared.pagoId, this.paymentData).subscribe(() => {
        this.paymentShared.notifyTableEdited();
      });
      this.closeModal();
  }
}

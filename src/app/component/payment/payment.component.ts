import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddPersonComponent } from '../table/modals/addPerson/modalAddPerson.component';
import { PaymentShared } from '../table/shared/paymentShared.service';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule],
  templateUrl: 'payment.component.html',
  styleUrls: ['payment.component.css'],
})
export class PaymentComponent implements OnInit {
  items: any[] = [];
  isSpinnerVisible: boolean = false;

  constructor(
    private paymentShared: PaymentShared,
    private editPaymentModal: NgbModal
  ) {}

  ngOnInit(): void {
    this.getAllPayments();
    this.paymentShared.paymentEdited$.subscribe(() => {
      this.getAllPayments();
    });
  }

  getAllPayments() {
    console.log('reloaded');
    this.isSpinnerVisible = true;
    this.paymentShared.getAllPayments().subscribe((data) => {
      this.items = data;
      this.isSpinnerVisible = false;
    });
  }

  showAddPersonModal() {
    console.log('clicked!');
    const modalRef = this.editPaymentModal.open(AddPersonComponent, {
      centered: true,
    });
  }
}

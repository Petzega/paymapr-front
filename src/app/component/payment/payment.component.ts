import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddPaymentComponent } from '../payment/modals/addPayment/modalAddPayment.component';
import { PaymentShared } from '../shared/paymentShared.service';
import { PersonShared } from '../shared/personShared.service';

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
    private editPaymentModal: NgbModal,
    private personShared: PersonShared
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
      for (const payment of data) {
        this.personShared.getItemById(payment.perId).subscribe((person) => {
          payment.perNombre = person.perNombre;
          payment.perApellido = person.perApellido;
        });
      }
      this.items = data;
      this.isSpinnerVisible = false;
    });
  }

  showAddPaymentModal() {
    console.log('clicked!');
    const modalRef = this.editPaymentModal.open(AddPaymentComponent, {
      centered: true,
    });
  }
}

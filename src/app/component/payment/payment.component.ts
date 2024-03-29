import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddPaymentComponent } from '../payment/modals/addPayment/modalAddPayment.component';
import { PaymentShared } from '../shared/paymentShared.service';
import { PersonShared } from '../shared/personShared.service';
import { EditPaymentComponent } from './modals/editPayment/modalEditPayment.component';
import { DeletePaymentComponent } from './modals/deletePayment/modalDeletePayment.component';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule],
  templateUrl: 'payment.component.html',
  styleUrls: ['payment.component.css'],
})
export class PaymentComponent implements OnInit {
  items: any[] = [];
  person: any = {};
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
  
  async getAllPayments() {
    console.log('reloaded');
    this.isSpinnerVisible = true;
    this.paymentShared.getAllPayments().subscribe(async (data) => {
      for (const payment of data) {
        this.person = await this.personShared.getItemById(payment.perId).toPromise();
        payment.perNombre = this.person.perNombre;
        payment.perApellido = this.person.perApellido;
      };
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

  getPaymentId(pagoId: string): void {
    if (pagoId) {
      this.paymentShared.pagoId = pagoId;
    }
  }
  
  getPayment(data: any): void {
    if (data) {
      this.paymentShared.payment = data;
    }
  }

  showEditPaymentModal(pagoId: string) {
    console.log('clicked!');
    const modalRef = this.editPaymentModal.open(EditPaymentComponent, {
      centered: true,
    });

    modalRef.componentInstance.editedItem = pagoId;
    this.getPaymentId(pagoId);
  }

  showDeletePaymentModal(data: any) {
    console.log('delete started!');
    const modalRef = this.editPaymentModal.open(DeletePaymentComponent, {
      centered: true,
    });
    modalRef.componentInstance.editedItem = data;
    this.getPayment(data);
  }
}

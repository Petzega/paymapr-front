import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule],
  templateUrl: 'payment.component.html',
  styleUrls: ['payment.component.css'],
})
export class PaymentComponent implements OnInit {

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
}

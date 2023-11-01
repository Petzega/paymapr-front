import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PaymentShared } from '../../../shared/paymentShared.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PersonShared } from 'src/app/component/shared/personShared.service';
import { NgFor, NgIf, CommonModule } from '@angular/common';
import { CategoryShared } from 'src/app/component/shared/categoryShared.service';
import { SubcategoryShared } from 'src/app/component/shared/subcategoryShared.service';

@Component({
  selector: 'app-edit-payment',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule, CommonModule],
  templateUrl: 'modalEditPayment.component.html',
  styleUrls: ['modalEditPayment.component.css'],
})
export class EditPaymentComponent implements OnInit {

  users: any[] = [];
  categories: any[] = [];
  subcategories: any[] = [];

  personData: any[] = [];
  paymentData: any = {};
  subcategoryData: any = {};
  catId: any = {};
  // subId: any[] = [];

  selectedCategory: string = '';
  selectedSubcategory: string = '';

  constructor(
    private paymentShared: PaymentShared,
    private personShared: PersonShared,
    private categoryShared: CategoryShared,
    private subcategoryShared: SubcategoryShared,
    private editPersonModal: NgbModal
  ) {}

  async ngOnInit(): Promise<void> {

    try {
      this.paymentData = await this.paymentShared.getPaymentById(this.paymentShared.pagoId).toPromise();
      this.catId = await this.categoryShared.getIdByDetail(this.paymentData.cpDetalle).toPromise();
      this.getSubcatByCat(this.catId[0].cpId);

    } catch (error) {
      console.error('Error al obtener datos:', error);
    }

    this.getAllPerson();
    this.getAllCategories();
  } 

  getAllPerson() {
    this.personShared.getAllItems().subscribe((data) => {
      this.users = data;
    });
  }
  
  getAllCategories() {
    this.categoryShared.getAllCategories().subscribe((data) => {
      this.categories = data;
    });
  }

  getSubcatByCat(cpId: string) {
    this.subcategoryShared.getAllSubcategoriesByCategory(cpId).subscribe((data) => {
      this.subcategories = data;
    });
  }

  closeModal() {
    this.editPersonModal.dismissAll();
  }

  editPayment() {
    this.paymentShared
      .updatePayment(this.paymentShared.pagoId, this.paymentData).subscribe(() => {
        this.paymentShared.notifyTableEdited();
      });
      this.closeModal();
  }

  async onCategorySelected() {
    this.catId = await this.categoryShared.getIdByDetail(this.paymentData.cpDetalle).toPromise();
    console.log(this.catId);
    this.getSubcatByCat(this.catId[0].cpId);
  }
}

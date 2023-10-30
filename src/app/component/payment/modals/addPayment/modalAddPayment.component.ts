import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf, CommonModule } from '@angular/common';
import { PaymentShared } from '../../../shared/paymentShared.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PersonShared } from 'src/app/component/shared/personShared.service';
import { CategoryShared } from 'src/app/component/shared/categoryShared.service';
import { SubcategoryShared } from 'src/app/component/shared/subcategoryShared.service';
import { TypeShared } from 'src/app/component/shared/typeShared.service';
import { MethodShared } from 'src/app/component/shared/methodShared.service';

@Component({
  selector: 'app-add-payment',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule, CommonModule],
  templateUrl: 'modalAddPayment.component.html',
  styleUrls: ['modalAddPayment.component.css'],
})
export class AddPaymentComponent implements OnInit {
  users: any[] = [];
  types: any[] = [];
  methods: any[] = [];
  categories: any[] = [];
  subcategories: any[] = [];
  paymentData: any = {
    perId: '',
    cpDetalle: '',
    spDetalle: '',
    tpDetalle: '',
    mpDetalle: '',
    pagoDetalle: '',
    pagoMonto: '',
  };
  personData: any = {};
  selectedUser: string = '';
  selectedCategory: string = '';
  selectedSubcategory: string = '';
  selectedType: string = '';
  selectedMethod: string = '';
  valuePaymentDetail: string = '';
  valuePaymentMount: string = '';

  constructor(
    private paymentShared: PaymentShared,
    private personShared: PersonShared,
    private categoryShared: CategoryShared,
    private subcategoryShared: SubcategoryShared,
    private typeShared: TypeShared,
    private methodShared: MethodShared,
    private addPaymentModal: NgbModal
  ) {}

  ngOnInit(): void {
    this.getAllPerson();
    this.getAllCategories();
    this.getAllTypes();
  }

  closeModal() {
    this.addPaymentModal.dismissAll();
  }

  addPayment() {
    if (this.selectedUser) {
      this.paymentData.perId = this.selectedUser;
    }
    if (this.selectedCategory) {
      const selectedCategoryObj = this.categories.find(category => category.cpId === this.selectedCategory);
      if (selectedCategoryObj) {
        this.paymentData.cpDetalle = selectedCategoryObj.cpDetalle;
      }
    }
    if (this.selectedSubcategory) {
      const selectedSubcategoryObj = this.subcategories.find(subcategory => subcategory.spId === this.selectedSubcategory);
      if (selectedSubcategoryObj) {
        this.paymentData.spDetalle = selectedSubcategoryObj.spDetalle;
      }
    }
    if (this.selectedType) {
      const selectTypeObj = this.types.find(type => type.tpId === this.selectedType);
      if (selectTypeObj) {
        this.paymentData.tpDetalle = selectTypeObj.tpDetalle;
      }
    }
    if (this.selectedMethod) {
      const selectMethodObj = this.methods.find(method => method.mpId === this.selectedMethod);
      if (selectMethodObj) {
        this.paymentData.mpDetalle = selectMethodObj.mpDetalle;
      }
    }
    if (this.valuePaymentDetail) {
      this.paymentData.pagoDetalle = this.valuePaymentDetail;
    }
    if (this.valuePaymentMount) {
      this.paymentData.pagoMonto = this.valuePaymentMount;
    }
  
    this.paymentShared.savePayment(this.paymentData).subscribe(() => {
      this.paymentShared.notifyTableEdited();
    });
    this.closeModal();
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

  onCategorySelected() {
    this.subcategoryShared
      .getAllSubcategoriesByCategory(this.selectedCategory)
      .subscribe((data) => {
        this.subcategories = data;
      });
  }

  getAllTypes() {
    this.typeShared.getAllTypes().subscribe((data) => {
      this.types = data;
    });
  }

  onTypeSelected() {
    this.methodShared
      .getAllMethodsByTypes(this.selectedType)
      .subscribe((data) => {
        this.methods = data;
      });
  }
}

import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PaymentShared } from '../../../shared/paymentShared.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PersonShared } from 'src/app/component/shared/personShared.service';
import { NgFor, NgIf, CommonModule } from '@angular/common';
import { CategoryShared } from 'src/app/component/shared/categoryShared.service';
import { SubcategoryShared } from 'src/app/component/shared/subcategoryShared.service';
import { MethodShared } from 'src/app/component/shared/methodShared.service';
import { TypeShared } from 'src/app/component/shared/typeShared.service';

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
  types: any[] = [];
  methods: any[] = [];

  personData: any[] = [];
  paymentData: any = {};
  subcategoryData: any = {};
  catId: any = {};
  medId: any = {};
  typeId: any = {};
  methId: any = {};

  selectedCategory: string = '';
  selectedSubcategory: string = '';
  valuePaymentDetail: string = '';
  valuePaymentMount: string = '';

  constructor(
    private paymentShared: PaymentShared,
    private personShared: PersonShared,
    private categoryShared: CategoryShared,
    private subcategoryShared: SubcategoryShared,
    private typeShared: TypeShared,
    private methodShared: MethodShared,
    private editPersonModal: NgbModal
  ) {}

  async ngOnInit(): Promise<void> {

    try {
      this.paymentData = await this.paymentShared.getPaymentById(this.paymentShared.pagoId).toPromise();
      this.catId = await this.categoryShared.getIdByDetail(this.paymentData.cpDetalle).toPromise();
      this.typeId = await this.typeShared.getIdByDetail(this.paymentData.tpDetalle).toPromise();
      this.getSubcatByCat(this.catId[0].cpId);
      this.getMethodByType(this.typeId[0].tpId);

    } catch (error) {
      console.error('Error al obtener datos:', error);
    }

    this.getAllPerson();
    this.getAllCategories();
    this.getAllTypes();
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

  async editPayment() {
    this.paymentShared
      .updatePayment(this.paymentShared.pagoId, this.paymentData).subscribe(async () => {
        await this.paymentShared.notifyTableEdited();
      });
      this.closeModal();
      // this.paymentShared.notifyTableEdited();
  }

  async onCategorySelected() {
    this.catId = await this.categoryShared.getIdByDetail(this.paymentData.cpDetalle).toPromise();
    this.getSubcatByCat(this.catId[0].cpId);
  }

  getMethodByType(tpId: string) {
    this.methodShared.getAllMethodsByTypes(tpId).subscribe((data) => {
      this.methods = data;
    });
  }

  async onTypeSelected() {
    this.typeId = await this.typeShared.getIdByDetail(this.paymentData.tpDetalle).toPromise();
    this.getMethodByType(this.typeId[0].tpId);
  }

  getAllTypes() {
    this.typeShared.getAllTypes().subscribe((data) => {
      this.types = data;
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf, CommonModule } from '@angular/common';
import { PersonShared } from './shared/personShared.service';
import { FormsModule } from '@angular/forms';
import { EditPersonComponent } from './modals/editPerson/modalEditPerson.component';
import { AddPersonComponent } from './modals/addPerson/modalAddPerson.component';
import { DeletePersonComponent } from './modals/deletePerson/modalDeletePerson.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule, CommonModule],
  templateUrl: 'person.component.html',
  styleUrls: ['person.component.css'],
})
export class PersonComponent implements OnInit {
  items: any[] = [];
  isSpinnerVisible: boolean = false;

  constructor(
    private personShared: PersonShared,
    private editPersonModal: NgbModal
  ) {}

  ngOnInit(): void {
    this.getAllPersons();
    this.personShared.personEdited$.subscribe(() => {
      this.getAllPersons();
    });
  }

  getAllPersons() {
    console.log('reloaded');
    this.isSpinnerVisible = true;
    this.personShared.getAllItems().subscribe((data) => {
      this.items = data;
      this.isSpinnerVisible = false;
    });
  }

  getPersonId(perId: string): void {
    if (perId) {
      this.personShared.perId = perId;
    }
  }

  showEditPersonModal(perId: string) {
    console.log('clicked!');
    const modalRef = this.editPersonModal.open(EditPersonComponent, {
      centered: true,
    });

    modalRef.componentInstance.editedItem = perId;
    this.getPersonId(perId);
  }

  showAddPersonModal() {
    console.log('clicked!');
    const modalRef = this.editPersonModal.open(AddPersonComponent, {
      centered: true,
    });
  }

  showDeletePersonModal(perId: string) {
    console.log('delete started!');
    const modalRef = this.editPersonModal.open(DeletePersonComponent, {
      centered: true,
    });

    modalRef.componentInstance.editedItem = perId;
    this.getPersonId(perId);
  }

/*   deletePerson(perId: string) {
    this.getPersonId(perId);
    this.personShared.dropPersonById(perId).subscribe(() => {
      this.personShared.notifyTableEdited();
    });
  } */
}

import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PersonShared } from '../../shared/personShared.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-edit-person',
  standalone: true,
  imports: [FormsModule],
  templateUrl: 'modalEditPerson.component.html',
  styleUrls: ['modalEditPerson.component.css'],
})
export class EditPersonComponent implements OnInit {

  personData: any = {};

  constructor(
    private personShared: PersonShared,
    private editPersonModal: NgbModal
  ) {}

  ngOnInit(): void {
    this.personShared.getItemById(this.personShared.perId).subscribe((data) => {
      this.personData = data;
    });
  }

  closeModal() {
    this.editPersonModal.dismissAll();
  }

  editPerson() {
    this.personShared
      .updatePersona(this.personShared.perId, this.personData).subscribe(() => {
        this.personShared.notifyTableEdited();
      });
      this.closeModal();
  }
}

import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PersonShared } from '../../../shared/personShared.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-delete-person',
  standalone: true,
  imports: [FormsModule],
  templateUrl: 'modalDeletePerson.component.html',
  styleUrls: ['modalDeletePerson.component.css'],
})
export class DeletePersonComponent implements OnInit {
  personData: any = {};

  constructor(
    private personShared: PersonShared,
    private deletePersonModal: NgbModal
  ) {}

  ngOnInit(): void {}

  closeModal() {
    this.deletePersonModal.dismissAll();
  }

  deletePerson() {
    this.personShared.dropPersonById(this.personShared.perId).subscribe(() => {
      this.personShared.notifyTableEdited();
    });
    this.closeModal();
  }
}

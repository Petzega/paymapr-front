import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PersonShared } from '../../shared/personShared.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-person',
  standalone: true,
  imports: [FormsModule],
  templateUrl: 'modalAddPerson.component.html',
  styleUrls: ['modalAddPerson.component.css'],
})
export class AddPersonComponent implements OnInit {
  personData: any = {};

  constructor(
    private personShared: PersonShared,
    private addPersonModal: NgbModal
  ) {}

  ngOnInit(): void {}

  closeModal() {
    this.addPersonModal.dismissAll();
  }

  addPerson() {
    this.personShared.savePerson(this.personData).subscribe(() => {
      this.personShared.notifyTableEdited();
    });
    this.closeModal();
  }
}

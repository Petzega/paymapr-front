import { Routes } from '@angular/router';
import { NgbdpaginationBasicComponent } from './pagination/pagination.component';
import { NgbdAlertBasicComponent } from './alert/alert.component';

import { NgbdDropdownBasicComponent } from './dropdown-collapse/dropdown-collapse.component';
import { NgbdnavBasicComponent } from './nav/nav.component';
import { BadgeComponent } from './badge/badge.component';
import { NgbdButtonsComponent } from './buttons/buttons.component';
import { CardsComponent } from './card/card.component';
import { PersonComponent } from './table/person.component';
import { PaymentComponent } from './payment/payment.component';

export const ComponentsRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'personas',
        component: PersonComponent,
      },
      {
        path: 'pagos',
        component: PaymentComponent,
      },
      {
        path: 'card',
        component: CardsComponent,
      },
      {
        path: 'pagination',
        component: NgbdpaginationBasicComponent,
      },
      {
        path: 'badges',
        component: BadgeComponent,
      },
      {
        path: 'alert',
        component: NgbdAlertBasicComponent,
      },
      {
        path: 'dropdown',
        component: NgbdDropdownBasicComponent,
      },
      {
        path: 'nav',
        component: NgbdnavBasicComponent,
      },
      {
        path: 'buttons',
        component: NgbdButtonsComponent,
      },
    ],
  },
];

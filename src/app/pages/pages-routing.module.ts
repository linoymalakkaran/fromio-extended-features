import { RouterModule, Routes } from '@angular/router';
import {  NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { ServiceFormBuilderComponent } from './forms/formbuilder/formbuilder.component';
import { ServiceFormComponent } from './forms/form/form.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'list',
      component: ServiceFormBuilderComponent,
      pathMatch: 'full',
    },
    {
      path: 'form-detail',
      component: ServiceFormComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  schemas: [
  ]
})
export class PagesRoutingModule {
}

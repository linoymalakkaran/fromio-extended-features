import { NgModule } from '@angular/core';
import { NbMenuModule, NbWindowModule, NbAlertModule } from '@nebular/theme';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { PagesRoutingModule } from './pages-routing.module';
import { ServiceFormBuilderModule } from './forms/formbuilder/formbuilder.module';



@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    NbAlertModule,
    NbWindowModule.forChild(),
    ServiceFormBuilderModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    PagesComponent,
  ],
  entryComponents: [],
  schemas: [
  ],
})
export class PagesModule {
}

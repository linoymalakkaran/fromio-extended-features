import {  NgModule } from '@angular/core';
import { FormioModule } from 'angular-formio-custom/angular-formio';
import { FormsModule } from '@angular/forms';

import {
  NbCardModule,
  NbButtonModule,
  NbInputModule,
  NbActionsModule,
  NbSelectModule,
  NbTabsetModule,
  NbCheckboxModule
} from '@nebular/theme';
import { ThemeModule } from '../../../@theme/theme.module';
import { SurveyAlertModule } from '../../alert.module';
import { ServiceFormComponent } from '../form/form.component';
import { ServiceFormPreviewComponent } from '../formpreview/form.preview.component';
import { ServiceFormBuilderComponent } from '../formbuilder/formbuilder.component';
import { OdataFormService } from '../../../@core/services/odata_services/odata.service.form';

@NgModule({
  schemas: [
  ],
  imports: [
    FormsModule,
    NbTabsetModule,
    NbCardModule,
    NbButtonModule,
    NbCheckboxModule,
    NbInputModule,
    NbSelectModule,
    ThemeModule,
    FormioModule,
    SurveyAlertModule,
    NbActionsModule,
      ],
  declarations: [
    ServiceFormComponent,
    ServiceFormBuilderComponent,
    ServiceFormPreviewComponent,
  ],
  exports:[
  ],
  providers: [
    OdataFormService,
    OdataFormService
  ]
})
export class ServiceFormBuilderModule { }

import {  NgModule } from '@angular/core';
import { FormioModule } from 'angular-formio-adports';
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
import { OdataService } from '../../../@core/services/odata_services/odata.service';

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
    OdataService,
  ]
})
export class ServiceFormBuilderModule { }

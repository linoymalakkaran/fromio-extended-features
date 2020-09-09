import { NgModule } from '@angular/core';

import { UserData } from './data/users';
import { UserMockService } from './mock/users.mock.service';
import { RestDataModule } from './services/rest_services/rest-data.module';
import { MapperService } from './services/common_services/mapper.service';
import { APP_BASE_HREF } from '@angular/common';
import { OdataSchemaService } from './services/odata_services/odata.service.schema';


//inject singleton services
const schemaService = new OdataSchemaService();
const mapperService = new MapperService(schemaService, false);

const DATA_SERVICES = [
  {
    provide: UserData,
    useClass: UserMockService
  },
];

export const NB_CORE_PROVIDERS = [
  ...RestDataModule.forRoot().providers,
  ...DATA_SERVICES,
];

@NgModule({
  imports: [
  ],
  exports: [
  ],
  declarations: [
  ],
  entryComponents: [
  ],
  schemas: [
  ],
  providers: [
    {
      provide: MapperService,
      useValue: mapperService
    },
    {
      provide: APP_BASE_HREF,
      useValue: window['base-href']
    },
    ...NB_CORE_PROVIDERS,
  ]
})
export class CoreModule {
}

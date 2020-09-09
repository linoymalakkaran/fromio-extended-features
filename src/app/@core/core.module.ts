import { NgModule } from '@angular/core';

import { MapperService } from './services/common_services/mapper.service';
import { APP_BASE_HREF } from '@angular/common';
import { OdataSchemaService } from './services/odata_services/odata.service.schema';


//inject singleton services
const schemaService = new OdataSchemaService();
const mapperService = new MapperService(schemaService, false);

const DATA_SERVICES = [];


export const NB_CORE_PROVIDERS = [
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

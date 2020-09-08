
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CoreModule } from './@core/core.module';
import { ThemeModule } from './@theme/theme.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import {
  NbMenuModule,
  NbSidebarModule,
} from '@nebular/theme';
import { HttpClientModule } from '@angular/common/http';

/**
 * Import the Custom component.
 */
import FormioHappinessSurvey from '../app/custom_components/happiness_survey_component/index';
Formio.use(FormioHappinessSurvey);

import FormioStarRating from '../app/custom_components/star_rating/index';
Formio.use(FormioStarRating);

@NgModule({
  schemas: [
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ThemeModule.forRoot(),
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    CoreModule,
    NgbModule,
  ],
  declarations: [
    AppComponent,
  ],
  providers: [
  ],
  entryComponents: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule { };


import { Component, HostListener } from '@angular/core';
import { AnalyticsService } from './@core/utils/analytics.service';
import { Store } from '@ngrx/store';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import $ from "jquery";
import { environment } from '../environments/environment';

@Component({
  selector: 'survey-app',
  templateUrl: './app.component.html'
})
export class AppComponent {

  IsReloaded: string;

  constructor(
    private analytics: AnalyticsService,
    ) {
   
  }

  ngOnInit() {
    this.analytics.trackPageViews();
    setTimeout(() => {
      let spinnerElm = document.getElementById('nb-global-spinner');
      spinnerElm.style.display = "none";
    }, 500);
  }
}

function customRedirect(url) {
  let $a = $('<a href="#"></a>');
  $a.attr("href", url);
  $a[0].click();
}

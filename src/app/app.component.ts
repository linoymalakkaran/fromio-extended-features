
import { Component, HostListener } from '@angular/core';
import { AnalyticsService } from './@core/utils/analytics.service';

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

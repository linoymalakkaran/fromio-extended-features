import { Component, } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'survey-formbuilder',
  templateUrl: './formbuilder.component.html',
  styleUrls: ['./formbuilder.component.scss'],
})
export class ServiceFormBuilderComponent {
  public searchTerm: string;
  public surveyList: any[];
  public surveyColDef;
  surveyReport: SurveyResponseModule.SurveyResponse[];
  fileName: string;
  surveyName: string;
  private gridApi;
  public newSurveyLabel: string = 'Create New Survey';
  public gridColMapping: {};

  constructor(
    private route: Router,
  ) {
  }

  public addnewform() {
    this.route.navigate(['/survey/form-detail']);
}

}






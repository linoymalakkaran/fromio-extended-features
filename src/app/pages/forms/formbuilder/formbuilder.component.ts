import { Component, TemplateRef, ViewChild, } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilderComponent } from 'angular-formio-custom/angular-formio';
import { FormModel } from '../../../@core/models/form.model';
import { OdataFormService } from '../../../@core/services/odata_services/odata.service.form';
import { Check } from '../../../@core/utils/check.utility';

@Component({
  selector: 'survey-formbuilder',
  templateUrl: './formbuilder.component.html',
  styleUrls: ['./formbuilder.component.scss'],
})
export class ServiceFormBuilderComponent {
  public forms: any[];
  public searchTerm: string;
  closeResult = '';
  surveyTemplate: any;
  surveyData: any;
  @ViewChild("content") modalContent: TemplateRef<any>;
  @ViewChild('formbuilder', { static: true }) formBuilder: FormBuilderComponent;
  form: FormModel;
  constructor(
    private modalService: NgbModal,
    private route: Router,
    private odataFormService: OdataFormService) {
    this.LoadForms();
    this.form = {
        Name: "",
        ValidationSchema: {
          Name: "",
          Code: "",
          Type: "extended",
          Schema: {
            Fields: []
          }
        },
        Schema: {
          display: "form",
          components: []
        },
        StartDate: null,
        EndDate: null,
        Description: '',
        BreadCrumbTemplate: {}
      };
  }


  public addnewform() {
    this.route.navigate(['/survey/form-detail']);
  }

  public filter() {
    if (this.searchTerm.length > 0) {
      this.forms = this.forms.filter(x => x.Name.includes(this.searchTerm)
        || x.Description.includes(this.searchTerm));
    }
    else
      this.LoadForms();

  }

  private async openDetails(args) {
    this.form.Schema = args.Schema;
    if (args.BreadCrumbTemplate && args.Schema.display == 'wizard') {
      this.formBuilder.setBreadCrumbsDisplay(args.Schema.display, args.BreadCrumbTemplate);
    }
    this.surveyTemplate = args.Schema;
    this.modalService.open(this.modalContent, { size: 'lg', backdrop: 'static' }).result.then((result) => {
    });
  }

  private async LoadForms() {
    let _forms = await this.odataFormService.getForms();
    if (!Check.isNull(_forms)) {
      this.forms = _forms.filter(f => f.Type !== "Configuration")
    }
  }

}






import { Component, ViewChild, TemplateRef, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormioUtils, FormBuilderComponent } from 'angular-formio-adports';

import { NbWindowService } from '@nebular/theme';
import { OdataFormService } from '../../../@core/services/odata_services/odata.service.form';
import { FormModel } from '../../../@core/models/form.model';
import { Check } from '../../../@core/utils/check.utility';

@Component({
  selector: 'survey-formbuilder',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class ServiceFormComponent implements OnInit {

  public forms: FormModel[];
  form: FormModel;
  schemaFields: any[];
  formId: string;
  flaten: any;
  resourceName: string = "";
  formInstance: any;
  validForm: boolean = true;
  @ViewChild('formbuilder', { static: true }) formBuilder: FormBuilderComponent;
  @ViewChild('previewTemplate', { static: true }) previewTemplate: TemplateRef<any>;
  @ViewChild('fullScreenTemplate', { static: true }) fullScreenTemplate: TemplateRef<any>;

  ngOnInit() {

  }

  constructor(
    private router: Router,
    private odataFormService: OdataFormService,
    private windowService: NbWindowService,
    private route: ActivatedRoute) {
    this.formId = this.route.snapshot.params.id;
    this.schemaFields = [];
    this.resourceName = "";
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
      Description: ''
    };
  }


  showPreview() {
    this.windowService.open(this.previewTemplate,
      { title: this.form.Name + ' Preview', windowClass: 'window-height' });
    //$("button.btn-wizard-nav-cancel").parent().css("display", "none");
  }

  onChangeTab(event) {
    if (event.tabTitle === "Form Schema") {
      let _formComponents = FormioUtils.flattenComponents(this.form.Schema.components, false);
      this.mapComponentsToFields(_formComponents);
    }
  }

  //on form change
  onChange(event) {
    if (event.type === "addComponent" ||
      event.type === "updateComponent" ||
      event.type === "deleteComponent") {
      this.form.Schema.components.forEach(element => {
        element.breadcrumb = "none"
      });
      let _formComponents = FormioUtils.flattenComponents(this.form.Schema.components, false);
      this.mapComponentsToFields(_formComponents);
    }
  }

  //popout form designer
  fullScreenEditor() {
    this.windowService.open(
      this.fullScreenTemplate,
      { title: 'Edit in full screen', windowClass: 'window-height' }
    )
      .onClose.subscribe((name: any) => {
        this.formBuilder.setDisplay(this.form.Schema.display);
      });
  }

  //for display mode
  setFormDisplay(event) {
    debugger;
    this.formBuilder.setDisplay(event);
  }


  //get form instance
  onReady(event) {
    this.formInstance = event.formio;
  }


  private getClrType(type: string) {
    switch (type) {
      case "text":
        return "string";
      case "number":
        return "int";
      case "checkbox":
        return "boolean";
      case "radio":
        return "boolean";
      case "select":
        return "string";
      case "date":
        return "datetime";
      default:
        return "string";

    }
  }


  private mapComponentsToFields(components: any[]) {
    //map components to validation schema fileds
    if (!Check.isNull(components)) {
      let _keys = Object.keys(components);
      this.schemaFields = [];
      _keys.forEach(mKey => {
        let _field = components[mKey];
        if (_field.inputType !== "submit" &&
          _field.inputType !== "button") {
          this.schemaFields.push({
            inputType: _field.type,
            Label: _field.label,
            Name: _field.key,
            ClrType: this.getClrType(_field.inputType),
            Path: _field.key,
            MaxLength: _field.validate.maxLength,
            Required: _field.validate.required,
            ValidationRegx: _field.validate.pattern
          });
        }
      });
    }
    if (this.form.ValidationSchema.Schema) {
      this.form.ValidationSchema.Schema.Fields = this.schemaFields;
    }
    return this.schemaFields;
  }

}


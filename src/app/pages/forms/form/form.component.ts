import { Component, ViewChild, TemplateRef, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormioUtils, FormBuilderComponent } from 'angular-formio-custom/angular-formio';

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

  breadCrumbsTemplateObj: object;
  public forms: FormModel[];
  form: FormModel;
  schemaFields: any[];
  formId: string;
  flaten: any;
  resourceName: string = "";
  formInstance: any;
  validForm: boolean = true;
  breadCrumbsTemplate = `<nav aria-label="breadcrumb" id="<%= ctx.wizardKey %>-header">
  <div class="row">
  <ul class="breadcrumbs">
    <%  ctx.panels.forEach(function(panel, index) { %>
          <li class="page-item<%= ctx.currentPage === index ? ' active' : ''%>" style="">
            <a href="#" ref="<%= ctx.wizardKey %>-link"> <%= ctx.t(panel.title) %> </a>
          </li>
      <% }) %>
  </ul>
  <span>
  <style>
  * {
    -webkit-backface-vibisility: hidden;
      -moz-backface-vibisility: hidden;
        -ms-backface-vibisility: hidden;
            backface-vibisility: hidden;
  }

  .breadcrumbs {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .breadcrumbs li {
    list-style: none;
    margin: 0;
    padding: 0;
    display: block;
    float: left;
    font-family: Helvetica Neue,sans-serif;
    font-size: 13px;
    text-transform: uppercase;
    font-weight: 700;
    letter-spacing: .05em;
    line-height: 20px;
    color: hsl(0, 0%, 30%);
  }

  .breadcrumbs li a {
    display: block;
    padding: 0 40px 0 0px;
    color: hsl(0, 0%, 30%);
    text-decoration: none;
    height: 20px;
    position: relative;
    perspective: 700px;
  }

  .breadcrumbs li a:after {
    content: '';
    width: 20px;
    height: 20px;
    border-color: #333;
    border-style: solid;
    border-width: 1px 1px 0 0;
    
    -webkit-backface-visibility: hidden;
    outline: 1px solid transparent;
    
    position: absolute;
    right: 20px;
    -webkit-transition: all .15s ease;
      -moz-transition: all .15s ease;
        -ms-transition: all .15s ease;
            transition: all .15s ease;
    -webkit-transform: rotateZ(45deg) skew(10deg, 10deg);
      -moz-transform: rotateZ(45deg) skew(10deg, 10deg);
        -ms-transform: rotateZ(45deg) skew(10deg, 10deg);
            transform: rotateZ(45deg) skew(10deg, 10deg);
  }


  .breadcrumbs li a:hover:after {
    right: 15px;
    -webkit-transform: rotateZ(45deg) skew(-10deg, -10deg);
      -moz-transform: rotateZ(45deg) skew(-10deg, -10deg);
        -ms-transform: rotateZ(45deg) skew(-10deg, -10deg);
            transform: rotateZ(45deg) skew(-10deg, -10deg);
  }
  </style>
  </span>
  </div>
</nav>`;
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
      Description: '',
      BreadCrumbTemplate: {}
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

  setBreadCrumbsHtmlDisplay() {
    var tplName = this.form.Schema.breadCrumbsTemplate;
    this.breadCrumbsTemplateObj = {
      tplName: tplName,
      type: 'html',
      tplHtml: this.breadCrumbsTemplate
    };
    this.formBuilder.setBreadCrumbsDisplay(this.form.Schema.display, this.breadCrumbsTemplateObj);
  }

  setBreadCrumbsDisplay(event) {
    var tplName = this.form.Schema.breadCrumbsTemplate;
    let type = 'object'
    this. breadCrumbsTemplateObj = {
      tplName: tplName,
      type: type,
      tplHtml: ''
    };
    this.formBuilder.setBreadCrumbsDisplay(this.form.Schema.display,this. breadCrumbsTemplateObj);
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

  submit() {
    if (Check.isNull(this.formId)) {
      this.form.BreadCrumbTemplate = this.breadCrumbsTemplateObj;
      this.odataFormService.addNewForm(this.form).then((result) => {
        this.formId = result.Id;
        alert("Form submitted successfully");
      })
        .catch(err => {
          alert("There is an error occured while sunmitting the form");
        });
    }
    else {
      this.odataFormService.updateForm(this.form).then((result) => {
        alert("Form submitted successfully");
      })
        .catch(err => {
          alert("There is an error occured while suspending the form");
        });
    }
  }


}


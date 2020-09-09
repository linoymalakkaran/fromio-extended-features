
import { Injectable } from '@angular/core';
import { FormModel } from '../../models/form.model';
import { MapperService } from '../common_services/mapper.service';

@Injectable()
export class OdataFormService {
  private readonly Model_Resource_Name: string = "Form";
  private readonly Model_Schema_Name: string = "Form";
  private readonly Model_Schema_Type: string = "extended";


  private forms: FormModel[] = [];
  constructor(
    protected mapperService: MapperService) {
  }

  async addNewForm(form: FormModel): Promise<FormModel> {
    return new Promise(async (resolve, reject) => {
      form.Id = newGuid();
      this.forms.push(form);
      resolve(form);
    });
  }

  async updateForm(form: FormModel): Promise<FormModel> {
    return new Promise(async (resolve, reject) => {
      let fm = this.forms.find(f => f.Id == form.Id);
      fm = form;
      resolve(form);
    });
  }


  async getForms(): Promise<FormModel[]> {
    return new Promise(async (resolve, reject) => {
      return resolve(this.forms);
    });
  }

  async getFormById(id: any): Promise<FormModel> {
    let _fm: FormModel = null;
    if (this.forms !== undefined) {
      _fm = this.forms.find(f => f.Id == id);
    }
    return new Promise(async (resolve, reject) => {
      return resolve(_fm);
    });

  }

  // //resource is coming from form dynamically
  // async submitForm(resourceName: string, form: any): Promise<FormModel> {
  //   return new Promise(async (resolve, reject) => {
  //     form.Id = newGuid();
  //     this.forms.push(form);
  //     resolve(form);
  //   });
  // }

}



var newGuid = (function() {
  var guid = Math.random() * 36;
  return function newGuid() {
    return Date.now().toString(36) + (guid++ % 36).toString(36) + Math.random().toString(36).slice(2, 4);
  };
})();

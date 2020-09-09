
import { Injectable } from '@angular/core';
import { FormApp, ServiceFormData } from '../../data/formapp';

@Injectable()
export class OdataFormService extends ServiceFormData {
  forms: FormApp[]
  constructor() {
    super();
  }

  async addNewForm(form: FormApp): Promise<FormApp> {
    return new Promise((resolve, reject) => {
      this.forms.push(form);
      resolve(form);
    });
  }
  async updateForm(form: FormApp): Promise<FormApp> {
    return new Promise((resolve, reject) => {
      var foundIndex = this.forms.findIndex(x => x._id == form._id);
      this.forms[foundIndex] = form;
      resolve(form);
    });
  }

  async getForms(fields?: any, query?: any): Promise<FormApp[]> {
    if (this.forms == undefined) {
      return this.forms;
    }
    return this.forms;
  }
  async getFormById(id: any): Promise<FormApp> {
    return new Promise((resolve, reject) => {
      let form = this.forms.findIndex(x => x._id == id) as FormApp;
      return resolve(form);
    });
  }
}



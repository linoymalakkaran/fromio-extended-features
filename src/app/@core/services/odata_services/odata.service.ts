import { Injectable, OnDestroy, OnInit } from "@angular/core";
import { o, OHandler, OdataQuery } from 'odata';
import { environment } from '../../../../environments/environment';
import { Subscription } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class OdataService implements OnDestroy {

  rootOdataUri: string = environment.rootOdataUrl;
  odataRoute: string = "odata";
  private storeSub: Subscription;
  private token: string;

  constructor(
  ) {
   
  }

  public async get(resource: string, query: OdataQuery): Promise<any> {
    try {
      let _oHandler = this.setAuthToken();
      return await _oHandler.get(`${this.odataRoute}/${resource}`).query(query);
    } catch (error) {
      console.log(`Error in odataServcie: ${error}`);
      return null;
    } finally {
    }
  }

  public async getRest(resource: string, query: OdataQuery): Promise<any> {
    try {
      let _oHandler = this.setAuthToken();
      return await _oHandler.get(resource).query(query);
    } catch (error) {
      console.log(`Error in odataServcie: ${error}`);
      return null;
    } finally {
    }
  }

  public async post(resource: string, body: any): Promise<any> {
    try {
      let _oHandler = this.setAuthToken();
      return await _oHandler.post(`${this.odataRoute}/${resource}`, body).query();
    } catch (error) {
      console.log(`Error in odataServcie: ${error}`);
      return null;
    } finally {
    }
  }

  public async postRest(resource: string, body: any): Promise<any> {
    try {
      let _oHandler = this.setAuthToken();
      return await _oHandler.post(resource, body).query();
    } catch (error) {
      console.log(`Error in odataServcie: ${error}`);
      return null;
    } finally {
    }
  }

  public async put(resource: string, body: any): Promise<any> {
    try {
      let _oHandler = this.setAuthToken();
      return _oHandler.put(`${this.odataRoute}/${resource}`, body).query();
    } catch (error) {
      console.log(`Error in odataServcie: ${error}`);
      return null;
    } finally {
    }
  }

  public async putRest(resource: string, body: any): Promise<any> {
    try {
      let _oHandler = this.setAuthToken();
      return _oHandler.put(resource, body).query();
    } catch (error) {
      console.log(`Error in odataServcie: ${error}`);
      return null;
    } finally {
    }
  }

  public async delete(resource: string, id: string): Promise<any> {
    try {
      let _oHandler = this.setAuthToken();
      return await _oHandler.delete(`${this.odataRoute}/${resource}('${id}')`).query();
    } catch (error) {
      console.log(`Error in odataServcie: ${error}`);
      return null;
    } finally {
    }
  }

  private setAuthToken() {
    let _oHandler = o(this.rootOdataUri, {
      headers: new Headers({
        "Authorization": `bearer ${this.token}`,
      })
    });
    return _oHandler;
  }

  ngOnDestroy() {
    if (this.storeSub) {
      this.storeSub.unsubscribe();
    }
  }
}

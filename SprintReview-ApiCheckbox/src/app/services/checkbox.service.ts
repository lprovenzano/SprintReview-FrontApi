import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CheckboxService {

  constructor(private client: HttpClient) {}

  getJsonFile (name :string) : any{
    let path = `assets/json/${name}.json`
    return this.client.get(path);
  }

  addPolicy(payload :string){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };

    return this.client.post("http://localhost:50342/api/Insurance/setupCheckbox", payload, httpOptions);
  }
}

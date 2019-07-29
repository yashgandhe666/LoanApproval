import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export class HelloWorldBean {
  constructor(public message: String) {  }
}


@Injectable({
  providedIn: 'root'
})
export class WelcomeDataService {
  private baseUrl = 'http://localhost:8080/api/customers';
  
  constructor(private http:HttpClient) { }

  executeHelloWorldBeanService(){
      return this.http.get<HelloWorldBean>('http://localhost:8080/helloworldbean');
    // console.log("Hello World Bean Service");
  }

  createUser(person: Object ): Observable<Object> {
    console.log("hi");
    return this.http.post(`${this.baseUrl}` + `/create`, person);
  }

  getCustomerBySSN(ssn: number) : Observable<any> {
    return this.http.get(`${this.baseUrl}` + `/ssn` + ssn);
  } 

  getCustomerByBureau(sid: number) : Observable<any> {
    return this.http.get(`http://localhost:8080/api/bureau/sid/${sid}`);
  }

  getCustomersList(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

}

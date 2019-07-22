import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export class HelloWorldBean {
  constructor(public message: String) {  }
}


@Injectable({
  providedIn: 'root'
})
export class WelcomeDataService {

  
  constructor(private http:HttpClient) { }

  executeHelloWorldBeanService(){
    return this.http.get<HelloWorldBean>('http://localhost:8080/helloworldbean');
    console.log("Hello World Bean Service");
  }
}

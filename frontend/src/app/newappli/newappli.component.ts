import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { WelcomeDataService } from '../service/data/welcome-data.service';
import { Person } from '../Person';

@Component({
  selector: 'app-newappli',
  templateUrl: './newappli.component.html',
  styleUrls: ['./newappli.component.css']
})
export class NewappliComponent implements OnInit {
  person = new Person();
  submitted=false;


  onSubmit() {
    this.submitted = true;
    console.log(this.person);
    this.welcomeDataService.getCustomerByBureau(this.person.ssn).subscribe(
      data => console.log(data),
      error => console.log(error)
    );
    console.log(this.person);
    this.welcomeDataService.createUser(this.person).subscribe(
      data => console.log(data),
      error => console.log(error)
    );

    this.person = new Person();
  }

  constructor(private welcomeDataService: WelcomeDataService) { }

  ngOnInit() {
  }

}

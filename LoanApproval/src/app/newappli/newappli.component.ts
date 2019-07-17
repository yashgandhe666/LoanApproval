import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'

@Component({
  selector: 'app-newappli',
  templateUrl: './newappli.component.html',
  styleUrls: ['./newappli.component.css']
})
export class NewappliComponent implements OnInit {
  profileForm = new FormGroup({
    personal: new FormGroup({
      firstName : new FormControl(''),
      middleName : new FormControl(''),
      lastName : new FormControl(''),
      maritial : new FormControl(''),
    }),
    
    address : new FormGroup({
      line1: new FormControl(''),
      line2: new FormControl(''),
      city: new FormControl(''),
      state: new FormControl(''),
      zip: new FormControl('')
    }),
    ssn : new FormControl(''),
    phNum : new FormGroup({
      phHome : new FormControl(''),
      phOff : new FormControl(''),
      phMob : new FormControl('')
    }),
    email : new FormControl(''),
    loanamt : new FormControl(''),
    loanprp : new FormControl(''),
    desc : new FormControl(''),
    empl : new FormGroup({
      workexp:  new FormControl(''),
      annual:  new FormControl(''),
      empName:  new FormControl(''),
      empAddr:  new FormGroup({
        empline1: new FormControl(''),
        empline2: new FormControl(''),
        empcity: new FormControl(''),
        empstate: new FormControl(''),
        empzip: new FormControl('')
      }),
    }),
    desig : new FormControl(''),
  });

  onSubmit() {
    console.warn(this.profileForm.value);
    // alert('Success');
  }

  constructor() {
    
  }

  ngOnInit() {
  }

}

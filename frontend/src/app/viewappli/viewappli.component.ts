import { Component, OnInit } from '@angular/core';
import { WelcomeDataService } from '../service/data/welcome-data.service';
import { Person } from '../Person';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-viewappli',
  templateUrl: './viewappli.component.html',
  styleUrls: ['./viewappli.component.css']
})
export class ViewappliComponent implements OnInit {
  
  persons: Observable<Person[]>;
  constructor(private  welcomeDataService: WelcomeDataService) { }

  ngOnInit() {
    this.persons = this.welcomeDataService.getCustomersList();
  }
  showMyContainer: boolean = false;
}

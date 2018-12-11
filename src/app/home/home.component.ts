import { Component, OnInit } from '@angular/core';
import { Http } from "@angular/http";
import { ActivatedRoute } from "@angular/router";
import { Router } from '@angular/router';

export interface IPerson {
  firstName:    string;
  weight:       number;
  maxBench:     number;
  maxSquat:     number;
  maxDeadlift:  number;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  people: Array<IPerson> = [];
  
  constructor(
    private router: Router, 
    private http: Http,
    private activatedRouter: ActivatedRoute
    ) { }

  ngOnInit() {
  }

  addTest() {
    const newPerson: IPerson = {
      firstName: null,
      weight:    null,
      maxBench:  null,
      maxDeadlift: null,
      maxSquat:   null
    }

    this.people.unshift(newPerson);
  }

  goToPage(path: string) {
    let fullName = null;
    let benchpress = 0;
    let squatweight = 0;
    let deadweight = 0;


    this.router.navigate([
      path, {

      }
    ]);
  }
}

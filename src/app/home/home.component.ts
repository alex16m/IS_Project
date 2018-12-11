import { Component, OnInit } from '@angular/core';
import { Http } from "@angular/http";
import { ActivatedRoute } from "@angular/router";
import { Router } from '@angular/router';
import {
  animate,
  state,
  style,
  transition,
  trigger
} from "@angular/animations";

export interface IPerson {
  firstName:    string;
  weight:       number;
  maxBench:     number;
  maxSquat:     number;
  maxDeadlift:  number;
}
export interface IWorkout {
  name: string;
  weight: number;
  bench: number;
  squat: number;
  deadlift: number;
  description: string;
  benchWorkout?: number;
  squatWorkout?: number;
  deadliftWorkout?: number;
}

let WORKOUT_DATA: IWorkout[] = [
  { name: "Alex", weight: 165, bench: 100, squat: 150, deadlift: 150, description: "hello"},
  { name: "Anthony", weight: 155, bench: 100, squat: 150, deadlift: 150, description: "hello"},
  { name: "Jason", weight: 140, bench: 100, squat: 150, deadlift: 150, description: "hello"}
];

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger("detailExpand", [
      state(
        "collapsed",
        style({ height: "0px", minHeight: "0", display: "none" })
      ),
      state("expanded", style({ height: "*" })),
      transition(
        "expanded <=> collapsed",
        animate("225ms cubic-bezier(0.4, 0.0, 0.2, 1)")
      )
    ])
  ]
})
export class HomeComponent implements OnInit {

  people: Array<IPerson> = [];
  
  workouts = WORKOUT_DATA;
  workoutsToDisplay = ['name', 'weight', 'bench', 'squat', 'deadlift'];
  expandedWorkout: IWorkout | null;

  constructor(
    private http: Http,
    private activatedRouter: ActivatedRoute,
    private router: Router
    ) { }

  async ngOnInit() {
    const savedPeople = JSON.parse(localStorage.getItem("people"));

      this.people = await this.loadTestFromFile();
  }

  async loadTestFromFile(){
    const people = await this.http.get("assets/people.json").toPromise();
    return people.json();
  }

  delete(index: number) {
    this.people.splice(index,1);
    this.saveToLocalStorage("person", this.people);
  }

  addPerson() {
    const newPerson: IPerson = {
      firstName: null,
      weight:    null,
      maxBench:  null,
      maxDeadlift: null,
      maxSquat:   null
    }

    this.people.push(newPerson);
    this.saveToLocalStorage("person", this.people);

  }
  
  saveToLocalStorage(key: string, data) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  goToPage(path: string) {
    let fullName = null;
    let benchpress = 0;
    let squatweight = 0;
    let deadweight = 0;

    this.saveToLocalStorage("person",this.people)
    this.router.navigate([
      path, {      }
    ]);
  }

  generateTable(){
    
  }
}

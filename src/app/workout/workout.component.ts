import { Component, OnInit } from "@angular/core";
import { Http } from "@angular/http";
import { ActivatedRoute } from "@angular/router";
import { Router } from "@angular/router";
import {
  animate,
  state,
  style,
  transition,
  trigger
} from "@angular/animations";

interface IWorkout {
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

export interface IPerson {
  firstName:    string;
  weight:       number;
  maxBench:     number;
  maxSquat:     number;
  maxDeadlift:  number;
}

let WORKOUT_DATA: IWorkout[] = [
  { name: "Alex", weight: 165, bench: 100, squat: 150, deadlift: 150, description: "hello"},
  { name: "Anthony", weight: 155, bench: 100, squat: 150, deadlift: 150, description: "hello"},
  { name: "Jason", weight: 140, bench: 100, squat: 150, deadlift: 150, description: "hello"}
];


@Component({
  selector: "app-workout",
  templateUrl: "./workout.component.html",
  styleUrls: ["./workout.component.css"],
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
export class WorkoutComponent implements OnInit {

  people: Array<IPerson> = [];
  //workouts: Array<IWorkout>;
  workouts = WORKOUT_DATA;
  workoutsToDisplay = ['firstName', 'weight', 'bench', 'squat', 'deadlift'];
  expandedWorkout: IPerson | null;
  data: object = {};


  constructor(
    private http: Http,
    private activatedRoute: ActivatedRoute,
    private router: Router,

  ) {

    (this.workouts[0] = {
      name: "Alex",
      weight: 155,
      bench: 155,
      squat: 200,
      deadlift: 200,
      description: "hello"
    }),
      (this.workouts[1] = {
        name: "Tran",
        weight: 155,
        bench: 155,
        squat: 200,
        deadlift: 200,
        description: "hello"
      });
  }

  async ngOnInit() {
    const savedPeople = JSON.parse(localStorage.getItem("people"));
      this.people = await this.loadTestFromFile();

      console.log(this.people)

    this.activatedRoute.params.subscribe((data) => {
      this.data = data;
    })

    this.workouts = savedPeople;

  }

  
  async loadTestFromFile(){
    const people = await this.http.get("assets/people.json").toPromise();
    return people.json();
  }

  generateWorkout(){
    for (let i = 0; i < this.workouts.length; i++) {
      let workout = this.workouts[i];
      workout.benchWorkout = workout.bench * .8;
      workout.squatWorkout = workout.squat * .7;
      workout.deadliftWorkout = workout.deadlift * 7;
    }

  }

}

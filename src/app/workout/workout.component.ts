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
  firstName: string;
  lastName: string;
  weight: number;
  maxBench: number;
  maxSquat: number;
  maxDeadlift: number;
  benchWorkout?: number;
  squatWorkout?: number;
  deadliftWorkout?: number;
  abWorkout?: number;
}

let WORKOUT_DATA: IPerson[] = [];

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
  workouts: Array<IPerson> = [];
  workoutsToDisplay = [
    "firstName",
    "weight",
    "maxBench",
    "maxSquat",
    "maxDeadlift"
  ];
  expandedWorkout: IPerson | null;
  data: object = {};

  constructor(
    private http: Http,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const savedPeople = JSON.parse(localStorage.getItem("person"));
    this.workouts = savedPeople;
    this.generateWorkout();
  }


  generateWorkout() {
    for (let i = 0; i < this.workouts.length; i++) {
      let workout = this.workouts[i];
      workout.benchWorkout = workout.maxBench * .8;
      workout.squatWorkout = workout.maxSquat * .7;
      workout.deadliftWorkout = workout.maxDeadlift * .7;
      workout.abWorkout = Math.floor(Math.random() * (workout.weight + 1));
      workout.benchWorkout.toFixed()
      workout.deadliftWorkout.toFixed();
      workout.squatWorkout.toFixed();
    }
    return this.workouts
  }
}

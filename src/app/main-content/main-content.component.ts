import { Component, OnInit } from '@angular/core';
import {Router } from '@angular/router';

@Component({
  selector: 'main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.css']
})
export class MainContentComponent implements OnInit {

  constructor(private router: Router){

  }

  ngOnInit() {
  }

  goToPage(path: string) {
    this.router.navigate([path]);
  }

}

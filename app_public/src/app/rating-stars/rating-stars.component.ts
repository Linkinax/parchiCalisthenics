import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-app-rating-stars',
  templateUrl: './rating-stars.component.html',
  styleUrls: ['./rating-stars.component.css']
})
export class AppRatingStarsComponent implements OnInit {

  constructor() { }


  @Input() location: any

  ngOnInit(): void {
  }



}

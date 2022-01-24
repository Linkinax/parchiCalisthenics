import { Component, OnInit } from '@angular/core';
import { Location } from './Location';

@Component({
  selector: 'app-home-list',
  templateUrl: './home-list.component.html',
  styleUrls: ['./home-list.component.css']
})


export class HomeListComponent implements OnInit {

  constructor() { }
  name= "Parco della Questura";

  location: Location= {
    _id: "String",
    name: "Parco della questura",
    distance: 14,
    address: "Via edlla questura",
    rating: 3,
    facilities: ["sbarra trazioni", "panca addominali", "parallele"],

  }
  ngOnInit(): void {
  }

}



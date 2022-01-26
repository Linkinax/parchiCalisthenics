import { Component, OnInit } from '@angular/core';
import { Location } from './Location';
import { ParchiDataService } from '../parchi-data.service';

@Component({
  selector: 'app-home-list',
  templateUrl: './home-list.component.html',
  styleUrls: ['./home-list.component.css']
})


export class HomeListComponent implements OnInit {

  public locations!: Location[];

  private getLocations():void {
    this.parchiDataService
      .getLocations()
      .then((foundLocations )=> this.locations=foundLocations);

  }

  constructor( private parchiDataService: ParchiDataService) { }
  name= "Parco della Questura";



  ngOnInit(): void {
    this.getLocations();
  }

}



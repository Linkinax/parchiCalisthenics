import { Component, OnInit } from '@angular/core';
import { Location } from './Location';
import { ParchiDataService } from '../parchi-data.service';
import { GeolocationService } from '../geolocation.service';

@Component({
  selector: 'app-home-list',
  templateUrl: './home-list.component.html',
  styleUrls: ['./home-list.component.css']
})


export class HomeListComponent implements OnInit {

  public locations!: Location[];
  public message:string | undefined;

  private getLocations(position:any):void {


    this.message= "In cerca dei parchi vicini..."
    const lat: number = position.coords.latitude;
    const lng: number = position.coords.longitude;



    console.log("HomeList compnent position:")
    console.log(position);

    console.log("HomeList compnent position.coordinates:")
    console.log(position.coords);

    this.parchiDataService
      .getLocations(lat, lng)
      .then((foundLocations )=> {

        this.message = foundLocations.length >0 ? ' ': "Nessun parco trovato =( "

        this.locations=foundLocations
      });

  }

  private showError(error:any){
    this.message = error.message;
  }

  private noGeo():void{
    this.message = "Geolocalizzazione non supportata dal browser corrente"
  }

  constructor( private parchiDataService: ParchiDataService, private geolocationService: GeolocationService) {

   }
  name= "Parco della Questura";



  ngOnInit(): void {
    this.getPosition();
  }

  private getPosition():void {
    this.message = "Calcolo della tua posizione..."
    this.geolocationService.getPosition(this.getLocations.bind(this), this.showError.bind(this), this.noGeo.bind(this));
  }

}



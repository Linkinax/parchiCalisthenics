import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';


import { Location } from './home-list/Location';
@Injectable({
  providedIn: 'root'
})
export class ParchiDataService {

  private apiBaseUrl =  "http://localhost:5560/api";
  constructor(private http: HttpClient) {
   }

   public getLocations(lat: number, lng:number): Promise< Location[] > {
     const maxDistance: number = 20;
     const url: string = `${this.apiBaseUrl}/locations?lng=${lng}&lat=${lat}&maxDist=${maxDistance}`;

     return this.http
      .get(url)
      .toPromise()
      .then((response) => response as Location[])
      .catch(this.handleError);
   }

   private handleError(error: any): Promise<any>{
     console.log("Something went wrong", error);
     return Promise.reject(error.message || error);
   }
}

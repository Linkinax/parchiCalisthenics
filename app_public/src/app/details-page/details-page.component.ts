import { Component, OnInit } from '@angular/core';
import { ParchiDataService } from '../parchi-data.service';
import { ParkLocation } from '../home-list/ParkLocation';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs';


@Component({
  selector: 'app-details-page',
  templateUrl: './details-page.component.html',
  styleUrls: ['./details-page.component.css']
})
export class DetailsPageComponent implements OnInit {

  constructor(
    private parchiDataService: ParchiDataService,
    private route: ActivatedRoute

    ) { }

  ngOnInit(): void {
    this.route.paramMap
    .pipe( //using the pipe operator to build sequences that will act on Observable
      switchMap((params:ParamMap   ) => { // switchMap to extract the rrequired elements from paramMap and return an Observable

        let id = params.get('locationId');
        return this.parchiDataService.getLocationById(id);
    }))
    .subscribe( (newLocation: ParkLocation) => {

      this.pageContent.header.title = newLocation.name;
      this.pageContent.sidebar =  `${newLocation.name} è presente sul sito. Lascia una review se ti è piaciuto come parco per farlo sapere agli altri utenti! `;
    });
  }

  public pageContent = {

    header: {
      title: ' This title will be changed',
      strapline: " "
    },
    sidebar: "Sidebar da cambiare successivamente from detail-service component"
  }

}

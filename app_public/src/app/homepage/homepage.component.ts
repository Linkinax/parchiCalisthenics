import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  public pageContent = {
    header: {
      title: "Parchi calisthenics",
      strapLine: "Trova i parchi calisthenics più vicini a te!",

    },
    sidebar: "Sidebar da cambiare successivamente"
  };

}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  public pageContent = {
    header: {
      title: 'Parchi calisthenics info',
      strapline: ' '
    },
    content :  'Questo sito è stato creato per aiutare gli amanti del calisthenics a trovare parchi con le attrezzature adatte alla propre esigenze'

  }

}

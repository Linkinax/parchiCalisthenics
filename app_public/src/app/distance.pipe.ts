import { DecimalPipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'distance'
})
export class DistancePipe implements PipeTransform {



  transform(distance: number): string {

    const isNumeric = function (n: any){
      return !isNaN(parseFloat(n)) && isFinite(n);
    };

    distance =  Number(distance.toString().replace(" m", ""));

    if (distance){
      let thisDistance= '0';
      let unit = 'm';

      if(distance > 1000){
        let tmp = Number(distance / 1000);
        thisDistance = (distance/1000).toFixed(1).toString();
        unit = 'km';
      }else{
        console.log("distance Pipe, else: "+ Number(distance));

        console.log("pipe case < 1000: "+ (Math.floor(distance)));
      }
      return thisDistance + unit;
    }else{
      return '?';
    }
  }
}

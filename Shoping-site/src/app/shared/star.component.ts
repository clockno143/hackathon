
import { Component, Input, OnChanges, SimpleChanges } from "@angular/core";

@Component(
    {
        selector:'pm-Star',
        templateUrl:'star.component.html',
        styleUrls:['star.component.css']
        
    }
)
export class strarComponent implements OnChanges {
    cropWidth:number=75;
    @Input() rating:number=0;
    ngOnChanges(): void {
        this.cropWidth=(75/5)*this.rating  ;    }
        

    
       

}
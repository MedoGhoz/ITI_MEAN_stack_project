import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-star',
  templateUrl: './star.component.html',
  styleUrls: ['./star.component.css']
})
export class StarComponent implements OnInit,OnChanges {
  @Input() width!: number;
  cropWidth:number=100;

  constructor() { }
  ngOnChanges(): void {
    
    this.cropWidth=(this.width/5) * this.cropWidth;
    console.log(this.cropWidth);
  }

  ngOnInit(): void {
  }

}

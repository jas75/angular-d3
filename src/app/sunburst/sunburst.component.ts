import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-sunburst',
  templateUrl: './sunburst.component.html',
  styleUrls: ['./sunburst.component.scss']
})
export class SunburstComponent implements OnInit {

  private svg: any;
  private margin = 50;
  private width = 750 - (this.margin * 2);
  private height = 400 - (this.margin * 2);

  private data = {
    name: "test",
    children: [
      {
        name: 'sous-test',
        children: [
          {
            name: 'sous-sous-test',
            value: 42
          }
        ]
      },
      {
        name: 'sous-test2',
        children: [
          {
            name: 'sous-sous-test2',
            value: 42
          }
        ]
      }
    ] 
  }
  constructor() { }

  ngOnInit(): void {
    this.createSvg();

  }

  private createSvg(): void {
    const root = this.partition(this.data);

    root.each((d: any) => d.current = d);

    this.svg = d3.create("svg")
        .attr("viewBox", [0, 0, this.width, this.width])
        .style("font", "10px sans-serif");
    // this.svg = d3.select("figure#sunburst")
    // .append("svg")
    // .attr("width", this.width + (this.margin * 2))
    // .attr("height", this.height + (this.margin * 2))
    // .append("g")
    // .attr("transform", "translate(" + this.margin + "," + this.margin + ")");


  }

  private partition(data: any) {
    const root = d3.hierarchy(data)
      .sum(d => d.value)
      .sort((a: any, b: any) => b.value - a.value);
    return d3.partition()
      .size([2 * Math.PI, root.height + 1])
    (root);
  }

}

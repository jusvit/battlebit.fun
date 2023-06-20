import {Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {ServerListDataProviderService} from '../../../shared/services/server-list-data-provider.service';
import {BaseChartDirective} from 'ng2-charts';
import {ChartConfiguration, ChartOptions} from 'chart.js';

@Component({
  selector: 'app-map-chart',
  templateUrl: './map-chart.component.html',
  styleUrls: ['./map-chart.component.scss']
})
export class MapChartComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart!: BaseChartDirective;


  public data: ChartConfiguration<'pie'>['data'] = {
    labels: [
    ],
    datasets: [
      {
        data: [
        ],
        backgroundColor: [
          'rgb(221, 71, 71)',
          'rgb(231, 111, 81)',
          'rgb(241, 152, 91)',
          'rgb(251, 192, 101)',
          'rgb(252, 233, 111)',
          'rgb(220, 220, 83)',
          'rgb(180, 220, 95)',
          'rgb(140, 220, 107)',
          'rgb(100, 220, 119)',
          'rgb(60, 220, 131)',
          'rgb(51, 197, 159)',
          'rgb(42, 174, 187)',
          'rgb(33, 152, 215)',
          'rgb(24, 129, 243)',
          'rgb(37, 105, 226)',
          'rgb(50, 81, 209)',
          'rgb(63, 57, 192)',
          'rgb(76, 33, 175)',
          'rgb(89, 9, 158)',
          'rgb(147, 51, 179)',
          'rgb(175, 91, 189)',
          'rgb(203, 131, 200)',
          'rgb(231, 171, 210)',
          'rgb(238, 150, 175)',
          'rgb(245, 130, 141)',
          'rgb(252, 110, 107)',
          'rgb(221, 75, 121)',
          'rgb(197, 55, 135)',
          'rgb(173, 35, 149)',
          'rgb(149, 15, 163)',
          'rgb(129, 41, 140)',
          'rgb(109, 67, 118)',
          'rgb(89, 93, 96)',
          'rgb(69, 119, 74)',
          'rgb(50, 145, 52)',
          'rgb(30, 171, 30)',
          'rgb(50, 177, 64)',
          'rgb(70, 183, 98)',
          'rgb(90, 189, 132)',
          'rgb(110, 195, 166)',
          'rgb(130, 201, 200)',
          'rgb(150, 207, 234)',
          'rgb(170, 213, 243)',
          'rgb(189, 219, 252)',
          'rgb(209, 225, 251)',
          'rgb(229, 231, 250)',
          'rgb(209, 192, 226)',
          'rgb(189, 158, 201)',
          'rgb(169, 123, 176)',
          'rgb(149, 88, 151)',
          'rgb(255, 255, 255)',
        ]
      },
    ],
  };
  public options: ChartOptions<'pie'> = {
    responsive: true,
    scales: {
      "x":
        {
          display: false,
        }
    },
  };
  public legend = false;


  constructor(public serverListDataProvider: ServerListDataProviderService) {
  }

  ngOnInit(): void {
    this.serverListDataProvider.changeSubject.subscribe(() =>{

      this.data.labels = [];
      this.data.datasets[0].data = []

      this.serverListDataProvider.mapCount.forEach((count, map) => {
        this.data.labels?.push(map);
        this.data.datasets[0].data.push(count);
      });

      this.chart?.update();
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.chart?.render();
  }
}
